% CCSC:SE 2018
% Andrew Besmer
% https://besmera.github.io

# Overview

## The Problem

* Some stuff doesn't really change much
    * Sorting
    * Trees
* Pedagogical research challenges us to consider using
    * New tools
    * New Frameworks
* I rely heavily on virtualization for: info sec, web development
* Others do the same: networking, operating systems

## The Problem

> * But we are a small school
* 6,109 students in 2016
* ITS had 1 Linux Administrator shared with us
* And he left
* Us running Ubuntu 12.04
* and we were rapidly approaching April 2016

## A Solution

> * Students can install this software on their own machines
* They will learn a lot in the process!
* However, educationally it is better to deliberately and carefully offload these tasks *where appropriate*

## A Better Solution

* Create an infrastructure that is
    * Modern (LTS)
    * Flexible
        * New/Updated software
        * Roaming students
    * Tightly integrated with campus systems
        * Authentication
            * SSSD & NSS & PAM & LDAP & Kerberos
            * 90 days? Forgot password?
        * Backup
    * ***Low Maintenance***

## Servers

* There are three servers at the heart of our Infrastructure
    * Deltona
        * Shared SQL Server
        * Shared Web Server
    * ***ACC***Linux
        * NFS
    * ***ACC***LinuxImager
        * Provisioning (The Foreman)
        * Configuration Management (Salt)
* Could likely be done with fewer servers
* Carefully named


## And Now

* New 1cr JavaScript class this semester wanted to work with Twilio and create an SMS app
    * We have nodejs, npm, etc... installed already
    * Client machines are behind NAT
    * Ngrock to the rescue

## And Now

* Download ngrok to server using `wget` or similar
* Create an SLS (SaLt State file)

```
# winthrop.devtools.ngrok
install-ngrok:
  file.managed:
    - name: /usr/local/bin/ngrok
    - source: salt://assets/usr/local/bin/ngrok
    - mode: 0755
    - user: root
    - group: root
    - backup: minionnode
```

## And Now


* Add to the `top.sls` file

```
    - winthrop.devtools.ngrok
```

* Deploy!

```
salt '*' state.apply winthrop.devtools.ngrok
```

## Updating and Maintenance

* Upgraded Ubuntu 16.04 to Ubuntu 18.04 in May
* Took very little time time as sls files barely changed
* If machine dies, ITS replaces and reimage takes ~1hr, with about 2-5 mins of human time.
* Test deploy students desired software
* Respond to 'I thought x was installed but it was not'

## Questions

* Any questions?

* https://besmera.github.com

# Infrastructure

## Installing Spotify

* Your paper mentioned Spotify, how did that work?
* Installing [spotify](https://www.spotify.com/us/download/linux/) on a single machine is easy
* Installing spotify on 33 machines is also easy but requires some [tools](https://docs.saltstack.com/en/latest/ref/states/all/salt.states.pkgrepo.html#salt.states.pkgrepo.managed)


## Installing Spotify

* Compile information into configuration and deploy!

```
add-spotify-ppa:
  pkgrepo.managed:
    - humanname: Spotify PPA
    - name: deb http://repository.spotify.com stable non-free
    - file: /etc/apt/sources.list.d/spotify.list
    # Need to lookup by searching for repository.spotify.com
    - keyid: D2C19886
    - keyserver: keyserver.ubuntu.com

add-spotify-package:
   pkg.installed:
      - name: spotify-client

```

## Infrastructure

* Our Linux infrastructure was created in two steps
    * ***Provisioning*** - Getting Linux onto the bare metal machines
    * ***Configuration Management*** - What the machine should have as a configuration

## Provisioning

* Our provisioning system is `Foreman` and can be found [on our server](https://acclinuximager.winthrop.edu)
    * Primarily used for provisioning of Linux operating systems
    * Supports bare metal or many different cloud providers like **Amazon EC2** or **Google Compute Engine**
* Does more than provisioning:    
    * Integration with LDAP
    * Auditing
    * Reporting
    * Fact Tables
        * What is the dell service tag of the lectern in CARR215?

```
host = carr215-lectern.win.winthrop.edu name = serialnumber
```

## Provisioning

* To configure foreman a few things need to be configured:
    * Installation Media
    * Templates
        * PXE (Preboot Execution Environment)
        * Partition Table
        * Provisioning
            * Provision
            * Finish
    * Operating Systems
    * Domains and Subnets
    * Host Groups
* And it needs to be done in roughly that order, there is some back and forth

## Installation Media

* The default Ubuntu repository is built into `Foreman`
    * Installations took a large amount of time due to bandwidth limitations presumably on Ubuntu's end
    * What is a computer scientist to do???

## apt-mirror

* Caching! So we mirror the entire Ubuntu repository for just the `xenial` branch
* Uses `apt-mirror`
* Wanted to mirror only `amd64` and not `i386` but...


```
############# config ##################
#
# set base_path    /var/spool/apt-mirror
#
# set mirror_path  $base_path/mirror
# set skel_path    $base_path/skel
# set var_path     $base_path/var
# set cleanscript $var_path/clean.sh
# set defaultarch  <running host architecture>
# set postmirror_script $var_path/postmirror.sh
# set run_postmirror 0
set nthreads     20
set _tilde 0
#
############# end config ##############

deb-amd64 http://archive.ubuntu.com/ubuntu bionic main main/debian-installer restricted restricted/debian-installer universe multiverse
deb-amd64 http://archive.ubuntu.com/ubuntu bionic-security main restricted universe multiverse
deb-amd64 http://archive.ubuntu.com/ubuntu bionic-updates main restricted universe multiverse
deb-amd64 http://archive.ubuntu.com/ubuntu bionic-proposed main restricted universe multiverse
deb-amd64 http://archive.ubuntu.com/ubuntu bionic-backports main restricted universe multiverse

deb-i386 http://archive.ubuntu.com/ubuntu bionic main main/debian-installer restricted restricted/debian-installer universe multiverse
deb-i386 http://archive.ubuntu.com/ubuntu bionic-security main restricted universe multiverse
deb-i386 http://archive.ubuntu.com/ubuntu bionic-updates main restricted universe multiverse
deb-i386 http://archive.ubuntu.com/ubuntu bionic-proposed main restricted universe multiverse
deb-i386 http://archive.ubuntu.com/ubuntu bionic-backports main restricted universe multiverse

deb-src http://archive.ubuntu.com/ubuntu bionic-security main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu bionic-updates main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu bionic-proposed main restricted universe multiverse
deb-src http://archive.ubuntu.com/ubuntu bionic-backports main restricted universe multiverse

clean http://archive.ubuntu.com/ubuntu

```

## apt-mirror

```
MAILTO="besmera@winthrop.edu"
0 2 * * 4 /usr/bin/apt-mirror
```

```

-------- Forwarded Message --------
Subject: 	Cron <root@acclinuximager> /usr/bin/apt-mirror
Date: 	Thu, 1 Nov 2018 02:06:50 -0400
From: 	Cron Daemon <root@acclinuximager.winthrop.edu>
To: 	besmera@winthrop.edu


Downloading 439 index files using 20 threads...
Begin time: Thu Mar 23 02:00:02 2017
[20]... [19]... [18]... [17]... [16]... [15]... [14]... [13]... [12]... [11]... [10]... [9]... [8]... [7]... [6]... [5]... [4]... [3]... [2]... [1]... [0]...
End time: Thu Mar 23 02:01:37 2017

Processing tranlation indexes: [TTTTTTTTTT]

Downloading 1116 translation files using 20 threads...
Begin time: Thu Mar 23 02:01:37 2017
[20]... [19]... [18]... [17]... [16]... [15]... [14]... [13]... [12]... [11]... [10]... [9]... [8]... [7]... [6]... [5]... [4]... [3]... [2]... [1]... [0]...
End time: Thu Mar 23 02:02:17 2017

Processing DEP-11 indexes: [DDDDDDDDDD]

Downloading 70 dep11 files using 20 threads...
Begin time: Thu Mar 23 02:02:17 2017
[20]... [19]... [18]... [17]... [16]... [15]... [14]... [13]... [12]... [11]... [10]... [9]... [8]... [7]... [6]... [5]... [4]... [3]... [2]... [1]... [0]...
End time: Thu Mar 23 02:02:19 2017

Processing indexes: [SSSSPPPPPPPPPP]

3.2 GiB will be downloaded into archive.
Downloading 877 archive files using 20 threads...
Begin time: Thu Mar 23 02:02:45 2017
[20]... [19]... [18]... [17]... [16]... [15]... [14]... [13]... [12]... [11]... [10]... [9]... [8]... [7]... [6]... [5]... [4]... [3]... [2]... [1]... [0]...
End time: Thu Mar 23 02:06:01 2017

19.9 GiB in 6290 files and 8 directories can be freed.
Run /var/spool/apt-mirror/var/clean.sh for this purpose.

Running the Post Mirror script ...
(/var/spool/apt-mirror/var/postmirror.sh)

This is an Ubuntu mirror - treat it kindly


Post Mirror script has completed. See above output for any possible errors.
```

## apt-mirror

* `apt-mirror` will not grab the installer files needed for Winthrop's setup so I used `rsync` to grab the remaining files


```
#!/bin/sh -e

## Anything in this file gets run AFTER the mirror has been run.
## Put your custom post mirror operations in here (like rsyncing the installer
## files and running clean.sh automatically)!

## Example of grabbing the extra installer files from Ubuntu (Note: rsync needs
## to be installed and in the path for this example to work correctly)


rsync --recursive --times --links --hard-links --delete --delete-after rsync://archive.ubuntu.com/ubuntu/dists/bionic/main/installer-amd64/ /var/spool/apt-mirror/mirror/archive.ubuntu.com/ubuntu/dists/bionic/main/installer-amd64/
```

## apt-mirror

* [http://acclinuxarchive.winthrop.edu/ubuntu/](http://acclinuxarchive.winthrop.edu/ubuntu/)
* Currently takes up `145GB` (Nov 2018)
* All installs and updates on machines now done from our data center instead of across the Internet

## PXE
* PXE (Preboot Execution Environment) is a standard for booting software from a network, in our case, the installation media
* Because WU could not support PXE through DHCP servers iPXE had to be used requiring separate setup
* iPXE just emulates what would happen during a PXE boot but requires the creation of a disk (usb/cdrom/etc...)
* Most of the setup is easy:
    * When running the `foreman-installer` tell it you will want `usbboot`
    * `apt-get` install `syslinux`, `genisoimage`, and `mkisofs`

## PXE
* Some is not:
    * It turns out foreman expects these assets to be in very specific locations (probably default on many other systems)
    * Read the source code to find expected locations and created symbolic links

## PXE

* The iPXE boot needs a template (soon described)
* This template was customized to allow the netboot disk to use DHCP
    * I believe the built in script was mismatched with the GUI that is now available

```
#!gpxe
<%#
kind: iPXE
name: Preseed default iPXE
oses:
- Debian
- Ubuntu
%>
<% if @host.operatingsystem.name == 'Debian' -%>
<% keyboard_params = "auto=true domain=#{@host.domain}" -%>
<% else -%>
<% keyboard_params = 'console-setup/ask_detect=false console-setup/layout=USA console-setup/variant=USA keyboard-configuration/layoutcode=us' -%>
<% end -%>
<% boot_files_uris = @host.operatingsystem.boot_files_uri(@host.medium,@host.architecture) -%>
<% kernel = boot_files_uris[0] -%>
<% initrd = boot_files_uris[1] -%>
<% static = @host.token.nil? ? '?static=yes' : '&static=yes' -%>

kernel <%= kernel %> interface=auto url=<%= foreman_url('provision')%> ramdisk_size=10800 root=/dev/rd/0 rw auto netcfg/disable_dhcp=false BOOTIF=${netX/mac} hostname=<%= @host.name %> <%= keyboard_params %> locale=<%= @host.params['lang'] || 'en_US' %> netcfg/get_ipaddress=${netX/ip} netcfg/get_netmask=${netX/netmask} netcfg/get_gateway=${netX/gateway} netcfg/get_nameservers=${dns}
initrd <%= initrd %>

boot
```

## Provisioning Templates

* With PXE boot, the local Ubuntu archive, the custom rsync of the net installer
    * We can now put a disk into the machine and get it to boot to the standard ubuntu installer
    * Unfortunately we would have to sit at each machine and answer prompts
    * Templates can automate this for us

## Partition Table

* One major prompt is about partitioning, how should the HD be used?
* Foreman provides a `Preseed default` template
    * It accepts custom configurations or provides a default (auto partition first disk)
    * Most of the template turns off common warnings and prompts for confirmation

```
<%#
kind: ptable
name: Preseed default
oses:
- Debian
- Ubuntu
%>
<%
  partitioning_method = @host.params['partitioning-method'] ? @host.params['partitioning-method'] : 'regular'
  partitioning_recipe = @host.params['partitioning-recipe'] ? @host.params['partitioning-recipe'] : 'atomic'
  partitioning_expert_recipe = @host.params['partitioning-expert-recipe'] ? @host.params['partitioning-expert-recipe'] : ''
  vg_name = @host.params['partitioning-vg-name'] ? @host.params['partitioning-vg-name'] : ''
  partitioning_filesystem = @host.params['partitioning-filesystem'] ? @host.params['partitioning-filesystem'] : ''
-%>

<% if @host.params['install-disk'] -%>
d-i partman-auto/disk string <%= @host.params['install-disk'] %>
<% else -%>
# Use the first detected hard disk as default installation disk
d-i partman/early_command string debconf-set partman-auto/disk "$(list-devices disk | head -n1)"
<% end -%>

### Partitioning
# The presently available methods are: "regular", "lvm" and "crypto"
d-i partman-auto/method string <%= partitioning_method %>

# If one of the disks that are going to be automatically partitioned
# contains an old LVM configuration, the user will normally receive a
# warning. This can be preseeded away...
d-i partman-lvm/device_remove_lvm boolean true
# The same applies to pre-existing software RAID array:
d-i partman-md/device_remove_md boolean true
# And the same goes for the confirmation to write the lvm partitions.
d-i partman-lvm/confirm boolean true
d-i partman-lvm/confirm_nooverwrite boolean true

<% if partitioning_method == 'lvm' -%>
# For LVM partitioning, you can select how much of the volume group to use
# for logical volumes.
d-i partman-auto-lvm/guided_size string max
<% if vg_name != '' -%>
d-i partman-auto-lvm/new_vg_name string <%= vg_name %>
<% end -%>
<% end -%>

# You can choose one of the three predefined partitioning recipes:
# - atomic: all files in one partition
# - home:   separate /home partition
# - multi:  separate /home, /var, and /tmp partitions (/usr was removed in jessie)
d-i partman-auto/choose_recipe select <%= partitioning_recipe %>

<% if partitioning_expert_recipe != '' -%>
# Or provide a recipe of your own...
# If you have a way to get a recipe file into the d-i environment, you can
# just point at it.
d-i partman-auto/expert_recipe string \
<%= partitioning_expert_recipe.gsub(/$/, " \\") %>

<% end -%>

# If you just want to change the default filesystem to something
# else, you can do that without providing a full recipe.
<% if partitioning_filesystem != '' -%>
d-i partman/default_filesystem string <%= partitioning_filesystem %>
<% end -%>

# This makes partman automatically partition without confirmation, provided
# that you told it what to do using one of the methods above.
d-i partman/confirm_write_new_label boolean true
d-i partman/choose_partition select finish
d-i partman/confirm boolean true
d-i partman/confirm_nooverwrite boolean true
```

## Provisioning

* Another template also called `Preseed Default` provides the other necessary configuration options without user intervention
    * Again, custom options can come from foreman
    * You can also customize these templates if needed

```
<%#
kind: provision
name: Preseed default
oses:
- Debian
- Ubuntu
%>
<%
  # safemode renderer does not support unary negation
  pm_set = @host.puppetmaster.empty? ? false : true
  proxy_string = @host.params['http-proxy'] ? " http://#{@host.params['http-proxy']}:#{@host.params['http-proxy-port']}" : ''
  puppet_enabled = pm_set || @host.param_true?('force-puppet')
  salt_enabled = @host.params['salt_master'] ? true : false
  os_major = @host.operatingsystem.major.to_i
  squeeze_or_older = (@host.operatingsystem.name == 'Debian' && os_major <= 6)
%>
# Locale
d-i debian-installer/locale string <%= @host.params['lang'] || 'en_US' %>
# country and keyboard settings are automatic. Keep them ...
# ... for wheezy and newer:
d-i keyboard-configuration/xkb-keymap seen true
<% if squeeze_or_older -%>
# ... for squeeze and older:
d-i console-keymaps-at/keymap seen true
<% end -%>

<% subnet = @host.subnet -%>
<% if subnet.respond_to?(:dhcp_boot_mode?) -%>
  <% dhcp = subnet.dhcp_boot_mode? && !@static -%>
<% else -%>
  <% dhcp = !@static -%>
<% end -%>
<% unless dhcp -%>
# Static network configuration.
d-i preseed/early_command string /bin/killall.sh; /bin/netcfg
d-i netcfg/disable_autoconfig boolean true
d-i netcfg/dhcp_failed note
d-i netcfg/dhcp_options select Configure network manually
d-i netcfg/disable_dhcp boolean true
d-i netcfg/get_ipaddress string <%= @host.ip %>
d-i netcfg/get_netmask string <%= subnet.mask %>
d-i netcfg/get_nameservers string <%= [subnet.dns_primary,subnet.dns_secondary].reject{|n| n.blank?}.join(' ') %>
d-i netcfg/get_gateway string <%= subnet.gateway %>
d-i netcfg/confirm_static boolean true
<% end -%>

# Network configuration
d-i netcfg/choose_interface select auto
d-i netcfg/get_hostname string <%= @host %>
d-i netcfg/get_domain string <%= @host.domain %>
d-i netcfg/wireless_wep string

d-i hw-detect/load_firmware boolean true

# Mirror settings
d-i mirror/country string manual
d-i mirror/http/hostname string <%= @preseed_server %>
d-i mirror/http/directory string <%= @preseed_path %>
d-i mirror/http/proxy string<%= proxy_string %>
d-i mirror/codename string <%= @host.operatingsystem.release_name %>
d-i mirror/suite string <%= @host.operatingsystem.release_name %>
d-i mirror/udeb/suite string <%= @host.operatingsystem.release_name %>

# Time settings
d-i clock-setup/utc boolean true
d-i time/zone string <%= @host.params['time-zone'] || 'UTC' %>

# NTP
d-i clock-setup/ntp boolean true
d-i clock-setup/ntp-server string <%= @host.params['ntp-server'] || '0.debian.pool.ntp.org' %>

# Set alignment for automatic partitioning
# Choices: cylinder, minimal, optimal
#d-i partman/alignment select cylinder

<%= @host.diskLayout %>

# Install different kernel
#d-i base-installer/kernel/image string linux-server

# User settings
d-i passwd/root-password-crypted password <%= root_pass %>
user-setup-udeb passwd/root-login boolean true
d-i passwd/make-user boolean false
user-setup-udeb passwd/make-user boolean false

<% repos = 0 %>
<% if puppet_enabled -%>
<% if @host.param_true?('enable-puppetlabs-repo') -%>
# Puppetlabs products
d-i apt-setup/local<%= repos %>/repository string \
      http://apt.puppetlabs.com <%= @host.operatingsystem.release_name %> main
d-i apt-setup/local<%= repos %>/comment string Puppetlabs products
d-i apt-setup/local<%= repos %>/source boolean true
d-i apt-setup/local<%= repos %>/key string http://apt.puppetlabs.com/pubkey.gpg
<% repos += 1 -%>
# Puppetlabs dependencies
d-i apt-setup/local<%= repos %>/repository string \
      http://apt.puppetlabs.com <%= @host.operatingsystem.release_name %> dependencies
d-i apt-setup/local<%= repos %>/comment string Puppetlabs dependencies
d-i apt-setup/local<%= repos %>/source boolean true
d-i apt-setup/local<%= repos %>/key string http://apt.puppetlabs.com/pubkey.gpg
<% repos += 1 -%>
<% end -%>
<% if @host.param_true?('enable-puppetlabs-pc1-repo') -%>
# Puppetlabs PC1 <%= @host.operatingsystem.release_name %> Repository
d-i apt-setup/local<%= repos %>/repository string http://apt.puppetlabs.com <%= @host.operatingsystem.release_name %> PC1
d-i apt-setup/local<%= repos %>/comment string Puppetlabs PC1 <%= @host.operatingsystem.release_name %> Repository
d-i apt-setup/local<%= repos %>/source boolean true
d-i apt-setup/local<%= repos %>/key string http://apt.puppetlabs.com/pubkey.gpg
<% repos += 1 -%>
<% end -%>
<% end -%>

<% if salt_enabled -%>
<% salt_package = 'salt-minion' -%>
<% if @host.param_true?('enable-saltstack-repo') -%>
<% if @host.operatingsystem.name == 'Debian' -%>
d-i apt-setup/local<%= repos %>/repository string http://debian.saltstack.com/debian <%= @host.operatingsystem.release_name %>-saltstack main
d-i apt-setup/local<%= repos %>/comment string SaltStack Repository
d-i apt-setup/local<%= repos %>/key string http://debian.saltstack.com/debian-salt-team-joehealy.gpg.key
<% repos += 1 -%>
<% end -%>
<% if @host.operatingsystem.name == 'Ubuntu' -%>
d-i apt-setup/local<%= repos %>/repository string http://ppa.launchpad.net/saltstack/salt/ubuntu <%= @host.operatingsystem.release_name %> main
d-i apt-setup/local<%= repos %>/comment string SaltStack Repository
d-i apt-setup/local<%= repos %>/key string http://keyserver.ubuntu.com/pks/lookup?op=get&search=0x4759FA960E27C0A6
<% repos += 1 -%>
<% end -%>
<% end -%>
<% else -%>
<% salt_package = '' -%>
<% end -%>

# Install minimal task set (see tasksel --task-packages minimal)
tasksel tasksel/first multiselect minimal, ssh-server, openssh-server

<% if puppet_enabled %>
<% puppet_package = @host.param_true?('enable-puppetlabs-pc1-repo') ? 'puppet-agent' : 'puppet' -%>
<% else -%>
<% puppet_package = '' -%>
<% end -%>

# Install some base packages
d-i pkgsel/include string <%= puppet_package %> <%= salt_package %> lsb-release
d-i pkgsel/update-policy select unattended-upgrades

popularity-contest popularity-contest/participate boolean false

# Boot loader settings
#grub-pc grub-pc/hidden_timeout boolean false
#grub-pc grub-pc/timeout string 10
d-i grub-installer/only_debian boolean true
d-i grub-installer/with_other_os boolean true
<% if @host.params['install-disk'] -%>
d-i grub-installer/bootdev string <%= @host.params['install-disk'] %>
<% elsif (@host.operatingsystem.name == 'Debian' and @host.operatingsystem.major.to_i >= 8) or (@host.operatingsystem.name == 'Ubuntu' and @host.operatingsystem.major.to_i >= 16) -%>
d-i grub-installer/bootdev string default
<% end -%>
d-i finish-install/reboot_in_progress note

d-i preseed/late_command string wget -Y off <%= @static ? "'#{foreman_url('finish')}&static=true'" : foreman_url('finish') %> -O /target/tmp/finish.sh && in-target chmod +x /tmp/finish.sh && in-target /tmp/finish.sh

```

## Provision Finish

* `Preseed default finish` template can provide last minute installation scripts
    * It would be tempting here to install all the WU customizations
    * Instead we ask the template to setup a configuration management tool `salt` later discussed

```
<%#
kind: finish
name: Preseed default finish
oses:
- Debian
- Ubuntu
%>
<%
  # safemode renderer does not support unary negation
  pm_set = @host.puppetmaster.empty? ? false : true
  puppet_enabled = pm_set || @host.param_true?('force-puppet')
  salt_enabled = @host.params['salt_master'] ? true : false
  chef_enabled = @host.respond_to?(:chef_proxy) && @host.chef_proxy
%>

<% subnet = @host.subnet -%>
<% if subnet.respond_to?(:dhcp_boot_mode?) -%>
<% dhcp = subnet.dhcp_boot_mode? && !@static -%>
<% else -%>
<% dhcp = !@static -%>
<% end -%>
<% unless dhcp -%>
# host and domain name need setting as these values may have come from dhcp if pxe booting
/bin/sed -i "s/^search.*$/search <%= @host.domain %>/g" /etc/resolv.conf
/bin/sed -i "s/.*dns-search.*/\tdns-search <%= @host.domain %>/g" /etc/network/interfaces
/bin/sed -i "s/^<%= @host.ip %>.*/<%= @host.ip %>\t<%= @host.shortname %>.<%= @host.domain %>\t<%= @host.shortname %>/g" /etc/hosts
/bin/echo <%= @host.shortname %> > /etc/hostname
<% end -%>

<% if @host.info['paramepreseed_networking_setup' %>
/usr/bin/wget --no-proxy --quietters']['realm'] && @host.realm && @host.realm.realm_type == 'FreeIPA' -%>
<%= snippet 'freeipa_register' %>
<% end -%>

<%= snippet('remote_execution_ssh_keys') %>

<% if chef_enabled %>
<%= snippet 'chef_client' %>
<% end -%>

<% if puppet_enabled %>
<%= snippet 'puppet_setup' %>
<% end -%>

<% if salt_enabled %>
<%= snippet 'saltstack_setup' %>
<% end -%>

<%= snippet 'preseed_networking_setup' %>
/usr/bin/wget --no-proxy --quiet --output-document=/dev/null --no-check-certificate <%= foreman_url('built') %>
```

## Operating Systems

* Templates on their own don't do anything
* Next step is to define an OS and associate the build templates with it
* This is an entirely GUI process
    * One thing that got me was understanding the back and forth
        * Create the OS
        * Edit the template, associate it with the OS
        * Edit the OS and select the relevant template
    * Would have been nice to have a single configuration interface of some sort

## Domains and Subnets

* Domains need to be configured mostly for dns search and association with subnets
* Two relevant ones:
    * `winthrop.edu` (servers)
    * `win.winthrop.edu` (clients)
* Subnets can be used by foreman to provide subnet specific templates, i.e. printer configurations, etc...

## Host Groups

* Host Groups are used to provide logical separation of types of hosts
* I have used two
    * `Ubuntu 18.04`
    * `Beowulf`
* However you could make these virtually anything

## Installation

* Now we will use the [GUI](https://acclinuximager.winthrop.edu) to add a new host for provisioning
    * Host: `demo`
    * MAC: `00:11:22:33:44:55`
* Checkout out the [preseed](https://acclinuximager.winthrop.edu/unattended/iPXE?mac=00:11:22:33:44:55)

## Installation

* All that and we have a computer that boots to a blank screen!
* Next we need to load it up with software.


# Configuration Management

## Salt

* Saltstack or simply `salt` is a configuration management and remote administration tool
* Two types of systems:
    * Salt master
    * Minions

## Salt

* It's installation on minions (clients) can be automated using a foreman template

```
<%#
kind: snippet
name: saltstack_setup
description: this snippet will configure the Saltstack Minion
%>
<%
etc_path = (@host.operatingsystem.family == 'Freebsd') ? '/usr/local/etc/salt' : '/etc/salt'
bin_path = (@host.operatingsystem.family == 'Freebsd') ? '/usr/local/bin' : '/usr/bin'
%>

<% if @host.operatingsystem.family == 'Debian' -%>
apt-get update
apt-get install -y salt-minion
<% elsif @host.operatingsystem.family == 'Freebsd' -%>
pkg install -y py27-salt
<% elsif @host.operatingsystem.family == 'Redhat' -%>
yum -t -y install salt-minion
<% end -%>

cat > <%= etc_path %>/minion << EOF
<%= snippet 'saltstack_minion' %>
EOF

<% if @host.operatingsystem.family == 'Freebsd' -%>
echo 'salt_minion_enable="YES"' >>/etc/rc.conf
echo 'salt_minion_paths="/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin"' >>/etc/rc.conf
<% elsif @host.operatingsystem.family == 'Redhat' -%>
/sbin/chkconfig --level 345 salt-minion on
<% elsif @host.operatingsystem.family == 'Suse' -%>
/sbin/chkconfig salt-minion on -f
<% end -%>

<%= bin_path %>/salt-call --no-color --grains >/dev/null

```

## Salt

* When the minion comes online it connects to the salt master retrieving the salt-master public key
* It sends it's own public key to the master along with it's hostname for registration
* On the salt master an administrator must run 'salt-key' and accept the keys of any clients it should be managing
* Once a key is accepted the minion can communicate with the master and vice versa

## Salt

* The `salt` command works by targeting accepted minions
* Since minions by default use their hostname as their `minion_id` and the hostnames are assigned based on locations it is easy to target machines
* `salt` can also issue arbitrary commands to be run by the client
* For example:
    * Which machines are turned on in CARR215?
    * `salt 'carr215*' test.ping`
    * Who is signed on THUR114?
    * `salt 'thur114*' cmd.run who`

## Salt

* Configuring machines by issuing a bunch of commands would probably work but is a bad idea
* Salt's power though really comes from its management of configuration
* On the master you can configure `/etc/salt/master` to specify relevant settings and a base directory to to hold config files

## Salt

* Configuration of minions is done through a YAML files that end in `.sls`
* The first file is a 'top' file
    * Levels of file are an id, target(s), and subsequent `.sls` files to include
    * Each line to include is delimited by a `.` with all parts making up the folder structure and the last part would be the filename


```
# top.sls

base:
  '*':
    - winthrop.desktop.desktop
    - winthrop.desktop.chromium
    - winthrop.desktop.env
    # Atom and not gedit required due to cifs problems
    - winthrop.devtools.git
    - winthrop.devtools.java
    - winthrop.devtools.c++
    - winthrop.devtools.scheme
    - winthrop.devtools.haskell
    - winthrop.devtools.python
    - winthrop.devtools.fortran
    - winthrop.devtools.prolog
    - winthrop.devtools.ruby
    - winthrop.devtools.mysql-client
    - winthrop.devtools.mongo-client
    - winthrop.devtools.php
    - winthrop.devtools.xdebug
    - winthrop.devtools.node
    - winthrop.devtools.misc-tools
    - winthrop.devtools.vim
    - winthrop.devtools.eclipse
    - winthrop.devtools.netbeans
    - winthrop.devtools.atom
    - winthrop.devtools.brackets
    - winthrop.devtools.symfony-installer
    - winthrop.devtools.meteor-installer
    - winthrop.devtools.vscode
    - winthrop.stats.r
    - winthrop.devtools.ngrok

  'thur114-* or carr215-* or thur317* or thur518* or thur315* or hopper*':
    - winthrop.security.antivirus
    - winthrop.ssh.ssh-server
    - winthrop.grub.disable-recovery
    - winthrop.auth.fail2ban
    - winthrop.printers.printers
    - winthrop.auth.wuauth
    - winthrop.auth.admin-user
    - winthrop.storage.nfs
    - winthrop.storage.cifs
    - winthrop.devtools.android-studio

  'thur114-* or carr215-* or thur317* or thur518* or thur315*':
    - winthrop.devtools.virtualbox
    - winthrop.devtools.virtualbox-doman
    - winthrop.devtools.virtualbox-besmer

  'carr215-lectern*':
    - winthrop.devtools.virtualbox-besmer-win7
    - winthrop.lab-management.server

  'carr215-*':
    - winthrop.lab-management.client

  'thur114-04*':
    - winthrop.grub.mario

  'virtual*':
    - winthrop.devtools.virtualbox-guest-additions
    - winthrop.printers.printers
    - winthrop.auth.wuauth
    - winthrop.auth.admin-user
    - winthrop.storage.nfs
    - winthrop.storage.cifs
    - winthrop.devtools.android-studio

```

## Salt

* Included sls files levels are id, command, options
* Omitting the options in many cases will use the id as the argument
    * I do not recommend doing this
    * Abandoned after issues with key uniqueness

```
install-ubuntu-desktop:
  pkg.installed:
    - pkgs:
      - ubuntu-desktop
      - ubuntu-restricted-extras
      - bash-completion

# The locale isn't set correctly so the terminal won't run!
locale-gen:
  cmd.run

localectl set-locale LANG="en_US.UTF-8":
  cmd.run

set-timezone:
  timezone.system:
    - name: America/New_York
```

## Salt

* Defining configuration is largely a matter of using the [documentation](https://docs.saltstack.com/en/latest/ref/states/all/index.html) to have salt install packages, edit configurations, manage files, etc...
* Once your configuration is ready for deployment you target the machines and ask them to apply the state
    * `salt '*' state.apply` forces all minions to read the top.sls and apply relevant sls specifications

# Our Configuration

## Our Configuration

* Lets take a tour of selected important pieces that make up our infrastructure

## Local Admin User

* It's a good idea to have a local admin user
* Note:
    * Home directory location
    * Password
    * ssh public key

```
# winthrop.auth.admin-user.sls
# /srv/salt/winthrop/auth/admin-user.sls

create-admin-user:
  user.present:
    - name: ubuntu
    - fullname: ACC Linux
    - shell: /bin/bash
    - gid_from_name: true
    - home: /ubuntu
    - groups:
      - adm
      - cdrom
      - sudo
      - dip
      - plugdev
      - lpadmin
    - password : $6$nMVdM....1

add-admin-ssh-key:
  ssh_auth.present:
    - user: ubuntu
    - name: ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDvYVlhsOiV4ueMf/Hmm65zN1A+19nWqEx6D64nSPWFxSbuP73TxHdpXU5csPpEzLhjfuh8NmuDbz6RaoKWYxafri0mfs9bvhIxFr7N0CIKUrxi8eNU0qiUXfVnxjZJQpzD5XIChfLBDzkMUFIHHlKzbo61L3KsAdS8NQvt1raOBy4nPo4szh3C6T1JiaHerpEStD5joXAktlk768lWr1OHsoYmR5GhJB3OccgFg7roORlaGnGzdi9HR39j8H+UZxSzQGVpQN/QdWEcU3rKC1z0LJkhXq0lkTVGF51W3WmUo5SvMcnaQMjRB/Wgym1c7u5ZXGsZgIH1SMMLkJ/QG+fR besmera@hydrogen

```

## Networked Home Directories

* Using NFS for a shared /home across all machines

```
# winthrop.storage.nfs
nfs-common:
  pkg:
   - installed

/home:
  mount.mounted:
    - device: acclinux.winthrop.edu:/srv/home
    - fstype: nfs
    - opts: rsize=8192,wsize=8192,bg,rw,nolock,nfsvers=3,hard,intr

acclinux-in-hosts:
  file.append:
    - name: /etc/hosts
    - text: 10.2.1.70 acclinux.winthrop.edu acclinux
```

## WU Auth

* Identification is done through LDAP, Authentication through kerberos

```
# winthrop.auth.wuauth

{% for pkg in ['sssd','libpam-sss','sssd-tools', 'krb5-user'] %}
{{ pkg }}:
  pkg.installed
{% endfor %}

/etc/sssd/sssd.conf:
  file.managed:
    - source: salt://assets/etc/sssd/sssd.conf
    - mode: 0600
    - user: root
    - group: root
    - backup: minion
    - makedirs: true

edit-common-session-mkhomrdir:
  file.append:
    - name: /etc/pam.d/common-session
    - text: session required  pam_mkhomedir.so  umask=0066  skel=/etc/skel

/etc/lightdm/lightdm.conf.d/50-unity-greeter.conf:
  file.managed:
    - source: salt://assets/etc/lightdm/lightdm.conf.d/50-unity-greeter.conf
    - mode: 0644
    - user: root
    - group: root
    - backup: minion
    - makedirs: true

restart-sssd:
  cmd.run:
    - name: service sssd restart

```

## WU Auth

* And the `/etc/sssd/sssd.conf`

```
[nss]
filter_groups = root
filter_users = root
reconnection_retries = 3

[pam]
reconnection_retries = 3

[sssd]
#custom re_expression for domain.user or user
re_expression = (((?P<domain>[^\\]+)\.(?P<name>.+$))|(^(?P<name>[^@\\]+)$))
config_file_version = 2
reconnection_retries = 3
sbus_timeout = 30
services = nss,pam
domains = acc,win

[domain/acc]
#With this as false, a simple "getent passwd" for testing won't work. You must do getent passwd user@domain.com
enumerate = false
cache_credentials = true
# debug_level = 9

id_provider = ldap
access_provider = ldap
auth_provider = krb5
chpass_provider = krb5

ldap_uri = ldaps://beaufort.winthrop.edu
ldap_search_base = cn=Users,dc=acc,dc=winthrop,dc=edu
ldap_tls_cacert = /etc/ssl/certs/ca-certificates.crt

#This parameter requires that the DC present a completely validated certificate chain. If you're testing or don't care, use 'allow' or 'never'.
ldap_tls_reqcert = demand

krb5_realm = ACC.WINTHROP.EDU
dns_discovery_domain = ACC.WINTHROP.EDU

ldap_schema = ad
ldap_access_order = expire
ldap_account_expire_policy = ad
ldap_force_upper_case_realm = true

ldap_user_search_base = cn=Users,dc=acc,dc=winthrop,dc=edu
ldap_user_object_class = user
ldap_user_name = sAMAccountName
ldap_user_fullname = displayName
ldap_user_principal = sssdPleaseConstructUPN
ldap_id_mapping = true

#Bind credentials
ldap_default_bind_dn=cn=visitor,cn=Users,dc=acc,dc=winthrop,dc=edu
ldap_default_authtok=redacted

fallback_homedir = /home/%d.%u
default_shell = /bin/bash

[domain/win]
#With this as false, a simple "getent passwd" for testing won't work. You must do getent passwd user@domain.com
enumerate = false
cache_credentials = true
# debug_level = 9

id_provider = ldap
access_provider = ldap
auth_provider = krb5
chpass_provider = krb5

ldap_uri = ldaps://westerly.winthrop.edu
ldap_search_base = dc=win,dc=winthrop,dc=edu
ldap_tls_cacert = /etc/ssl/certs/ca-certificates.crt

#This parameter requires that the DC present a completely validated certificate chain. If you're testing or don't care, use 'allow' or 'never'.
ldap_tls_reqcert = demand

krb5_realm = WIN.WINTHROP.EDU
dns_discovery_domain = WIN.WINTHROP.EDU


ldap_schema = ad
ldap_access_order = expire
ldap_account_expire_policy = ad
ldap_force_upper_case_realm = true

ldap_user_search_base = dc=win,dc=winthrop,dc=edu
ldap_user_object_class = user
ldap_user_name = sAMAccountName
ldap_user_fullname = displayName
ldap_user_principal = sssdPleaseConstructUPN
ldap_id_mapping = true

#Bind credentials
ldap_default_bind_dn=cn=visitor,ou=Generic Accounts,ou=Winthrop University,ou=Real Users,dc=win,dc=winthrop,dc=edu
ldap_default_authtok=redacted

fallback_homedir = /home/%d.%u
default_shell = /bin/bash
```

## WU Z Drive

* Using Kerberos means we get a ticket granting ticket that can be used with the file servers for authentication


```
# winthrop.storage.cifs

{% for pkg in ['cifs-utils','libpam-mount'] %}
{{ pkg }}:
  pkg.installed
{% endfor %}


manage-pam_mount.conf.xml:
  file.managed:
    - name: /etc/security/pam_mount.conf.xml
    - source: salt://assets/etc/security/pam_mount.conf.xml
    - mode: 0600
    - user: root
    - group: root
    - backup: minion
    - makedirs: true

edit-session-common-libpam-mount:
  file.append:
    - name: /etc/pam.d/common-session
    - text: session  optional  pam_mount.so

```

## WU Z Drive

* And mounting the drive automatically

```
/srv/salt/assets/etc/security/pam_mount.conf.xml

<?xml version="1.0" encoding="utf-8" ?>

<!DOCTYPE pam_mount SYSTEM "pam_mount.conf.xml.dtd">
<!--
	See pam_mount.conf(5) for a description.
-->

<pam_mount>

<debug enable="1" />

		<!-- debug should come before everything else,
		since this file is still processed in a single pass
		from top-to-bottom -->

<debug enable="0" />

		<!-- Volume definitions -->


		<!-- pam_mount parameters: General tunables -->

<!--
<luserconf name=".pam_mount.conf.xml" />
-->

<!-- Note that commenting out mntoptions will give you the defaults.
     You will need to explicitly initialize it with the empty string
     to reset the defaults to nothing. -->
<mntoptions allow="nosuid,nodev,loop,encryption,fsck,nonempty,allow_root,allow_other" />
<!--
<mntoptions deny="suid,dev" />
<mntoptions allow="*" />
<mntoptions deny="*" />
-->
<mntoptions require="nosuid,nodev" />

<logout wait="0" hup="0" term="0" kill="0" />


		<!-- pam_mount parameters: Volume-related -->

<mkmountpoint enable="1" remove="true" />

<volume fstype="cifs" server="metropolis.winthrop.edu" path="share" mountpoint="/media/%(USER)/S" options="sec=krb5,uid=%(USER),cruid=%(USER),user=%(USER),file_mode=0700,dir_mode=0700">
	<sgrp>Domain Users</sgrp>
</volume>
<volume fstype="cifs" server="metropolis.winthrop.edu" path="%(USER)" mountpoint="/media/%(USER)/Z" options="sec=krb5,uid=%(USER),cruid=%(USER),user=%(USER),file_mode=0700,dir_mode=0700">
	<sgrp>Domain Users</sgrp>
</volume>

</pam_mount>

```

## Installing Eclipse

* Eclipse is available in the repository but...
* Alternative is to have salt manage the files directly
* Note:
    * Different versions
    * Script

```
install-eclipse-cpp:
  file.recurse:
    - name: /usr/share/eclipse-cpp
    - source: salt://assets/usr/share/eclipse-cpp
    - clean: true
    - user: root
    - group: root
    - dir_mode: 655
    - file_mode: 655
    - include_empty: true

make-eclipse-cpp-executable:
  cmd.run:
    - name: chmod +x /usr/share/eclipse-cpp/eclipse

add-eclipse-cpp-unity-shortcut:
  file.managed:
    - name: /usr/share/applications/eclipse-cpp.desktop
    - source: salt://assets/usr/share/applications/eclipse-cpp.desktop
    - mode: 0644
    - user: root
    - group: root
    - backup: minion

install-eclipse-jee:
  file.recurse:
    - name: /usr/share/eclipse-jee
    - source: salt://assets/usr/share/eclipse-jee
    - clean: true
    - user: root
    - group: root
    - dir_mode: 655
    - file_mode: 655
    - include_empty: true

make-eclipse-jee-executable:
  cmd.run:
    - name: chmod +x /usr/share/eclipse-jee/eclipse

add-eclipse-jee-unity-shortcut:
  file.managed:
    - name: /usr/share/applications/eclipse-jee.desktop
    - source: salt://assets/usr/share/applications/eclipse-jee.desktop
    - mode: 0644
    - user: root
    - group: root
    - backup: minion

add-eclipse-script:
  file.managed:
    - name: /usr/local/bin/eclipse
    - source: salt://assets/usr/local/bin/eclipse
    - mode: 0755
    - user: root
    - group: root
    - backup: minion

```

## Deploying Printers

* Cups (Common UNIX Printing System)

```
# winthrop.printers.printers
stop-cups-service:
  service.dead:
    - name: cups

install-cups-ppd:
  file.recurse:
    - name: /etc/cups/ppd
    - source: salt://assets/etc/cups/ppd
    - clean: true
    - user: root
    - group: lp
    - dir_mode: 761
    - file_mode: 740
    - include_empty: true

install-cups-printconf:
  file.managed:
    - name: /etc/cups/printers.conf
    - source: salt://assets/etc/cups/printers.conf
    - mode: 0600
    - user: root
    - group: lp
    - backup: minion

start-cups:
  service.running:
    - name: cups

```


## Responding to Incidents

* Secure Shell Client not up to date and didn't support any newer ciphers

```
# winthrop.ssh.ssh-server

install-ssh:
  pkg.installed:
    - pkgs:
      - openssh-server

#Remove this from being managed in Fall
enable-weak-ciphers:
  file.managed:
    - name: /etc/ssh/sshd_config
    - source: salt://assets/etc/ssh/sshd_config
    - mode: 0644
    - user: root
    - group: root
    - backup: minion

#  file.append:
#    - name: /etc/ssh/sshd_config
#    - text:
#      - Ciphers aes128-cbc,aes192-cbc,aes256-cbc,blowfish-cbc,arcfour
#      - KexAlgorithms diffie-hellman-group1-sha1
```


## Mario!

* An infrastructure isn't complete without an easter egg.
* One machine, and only one machine, will play a Mario powerup on boot.  
* Which one is it? ***Hint:*** Check `top.sls`!

```
# winthrop.grub.mario
# https://gist.github.com/MaxLaumeister/f93717e91c8bd9d435a5

grub-mario-powerup:
  file.append:
    - name: /etc/default/grub
    - text: GRUB_INIT_TUNE="1750 523 1 392 1 523 1 659 1 784 1 1047 1 784 1 415 1 523 1 622 1 831 1 622 1 831 1 1046 1 1244 1 1661 1 1244 1 466 1 587 1 698 1 932 1 1195 1 1397 1 1865 1 1397 1"

update-grub-mario:
  cmd.run:
    - name: update-grub
```

# Questions

## Questions

* Questions?
