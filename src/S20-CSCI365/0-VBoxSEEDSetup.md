% VBox SEED Lab Setup
% Dr. Andrew Besmer

# Setup

## Setup VirtualBox

1) Open VirtualBox
	* Goto `File` -> `Preferences`
	* Under `Network` and the `NAT Networks` tab click `+`
	* You should see a new network `NATNetwork` created
	* Click on it and click the edit button to the right
	* Set the network CIDR to `172.16.1.0/24`
	* Click OK
	* Click OK

## Add The Virtual Machine
3) Go back to VirtualBox and click `File` -> `Import`
	* Browse to find `/usr/share/VirtualBoxVMs/SEED/SEED16.04-Default.ova` on a linux lab machine or download this file from the <a href="https://deltona.birdnest.org/SEED16.04-Default.ova">Deltona Server</a> if working on your own machine.
	* Click `Next`
	* On this screen check the option to "Reinitialize the MAC address of all network cards"
	* Click `Import`
	* Once the process is complete you should have a VM `SEED Default` setup automatically.


## Configure the Virtual Machine
4) Click on the newly created VM and click `settings`
	* Under `Network` and the `Adapter 2` tab
		* Click `Enable Network Adapter`
		* Change attached to from `NAT` to `NAT Network`
	* Click OK

5) Verify the machine starts and then power it down.  You can use the username `seed` and password `dees`.

## Cloning

* You should never work from the default machine you created, instead clone the machine incase you make mistakes
* So... When Cloning!
	* Be sure to ***reinitialize the mac address*** of all network cards and ***create a full clone***, not linked

