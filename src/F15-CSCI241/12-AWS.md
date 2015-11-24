% AWS
% Dr. Andrew Besmer

# AWS

## AWS

* Amazon Web Services provides cloud solutions for computing
	* Can run cloud servers i.e. ubuntu w/apache, php
	* Manage identity
	* Send email
	* Build API's
	* etc...

## AWS

* Sign into [AWS Web Services](http://aws.amazon.com)
* We will use EC2 which provides virtual servers in the cloud
* Locations include:
	* ***US East (N. Virginia)***
	* US West (Oregon)
	* US West (N. California)
	* EU (Ireland)
	* EU (Frankfurt)
	* Asia Pacific (Singapore)
	* Asia Pacific (Tokyo)
	* Asia Pacific (Sydney)
	* South America (Sao Paulo)


## EC2

* The EC2 Dashboard contains information about your
	* Running instances
	* Provisioned volumes
	* Elastic IPs
	* Key Pairs
	* Etc...


## Launching EC2 

* When launching EC2 Instance you will choose an AMI
* AMI or Amazon Machine Image is a preconfigured system
	* Linux (Ubuntu, Red Hat, ...)
	* Windows (Windows Servers)
	* Community submitted 
* Be careful and select the free tier eligible one

## Launching EC2

* There are many Instance Types that vary by price and resources
	* t2.micro (1 CPU, 1 GB RAM) 
		* .013c/hr or ~9.36/mth
	* t2.large (2 CPU, 8 GB RAM)
		* .104c/hr or ~74.88/mth
* There are a number of options that can be configured
	* Storage and Security are common things to configure

## Launching EC2

* By default only port 22 is open (ssh)
	* You may wish to open 80 (www)
* Initial access is only allowed via keypair
	* No user/pass by default


## Launching EC2

* Visit the dashboard to see your running instance and IP address
	* Look for the public IP not the Private
* Connecting to the machine is initially allowed only using the keypair
	* Must be read only to owner only `600`

```
ssh -i YOURPERSONAL.pem ubuntu@ASSIGNEDIP
```

```bash
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0664 for '/home/user/.ssh/aws.pem' are too open.
It is recommended that your private key files are NOT accessible by others.
This private key will be ignored.
key_load_private_type: bad permissions
Permission denied (publickey).
```

## Enable Challenge Response

* `sudo` is used to execute commands as administrator (`root`)
* Use sudo to edit the file `/etc/ssh/sshd_config`
	* Change `ChallengeResponseAuthentication` from `no` to `yes`
* Restart the ssh service
	* `sudo service ssh restart`
* Create a password for the ubuntu user
	* `sudo passwd ubuntu`
* You can now login without the keypair, keep it safe though

## Handy Commands 

* A few commands that will come in handy
	* `service` - Start/Stop/Restart services
	* `df -h` - Disk usage
	* `apt-get update` - Refresh package meta-data
	* `apt-get upgrade` - Upgrade packages
	* `apt-get install` - Install packages

## Install Apache 2

1. Update the package meta data
2. Install Apache 2 for the web server

```
sudo apt-get update
sudo apt-get install apache2
```

## Check Apache 2

* Check it by visiting the ip address in your browser
* Don't forget HTTP must be allowed in the security group
* You will see the Default page located at `/var/www/html`


## Install PHP

* Install `php5` 
* Create an `info.php` file in the `/var/www/html` directory to test your php installation

```
sudo apt-get install php5
```

```php
<?php
//info.php
phpinfo();
```


## Domain 

* Only a temporary IP address is initially assigned
* Need a static ip to host domain
	* Amazon has Elastic IPs
	* First allocate it 
	* Then associate it
* Now set this IP as the A record for your domain


## Additional Sites

* Create a `.conf` file for the subdomain in `/etc/apache2/sites-available`
	* `a2ensite nameOfSiteWithoutConfExtension`
* Create directory for the domain
* Restart apache2
	* `service apache2 reload` (Restart would work too)

```
<VirtualHost *:80>
    ServerName sub.domain.com
    DocumentRoot /var/www/sub.domain.com
</VirtualHost>
```

## AWS

* Remember after this class is over to remove any resources from running or being used to avoid billing
* Things you are likely using
	* EC2 Instance
	* Storage
	* IP addresses


