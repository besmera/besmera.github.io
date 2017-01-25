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

## Extract SEED Files

2) Open the terminal
3) Run

```

unzip /usr/share/VirtualBoxVMs/SEED/SEEDUbuntu12.04.zip -d /var/VirtualBox/`whoami`/SEED-Default
 
```

## Add The Virtual Machine
4) Go back to VirtualBox and click `New`
	* Name the machine `SEED-Default`
	* Set Type to `Linux`
	* Set Version to `Ubuntu (32bit)` ***!!!32bit!!!***
	* Click `Next`
	* Set the RAM to `512MB`
	* Click `Next`
	* Click use existing virtual hard drive disk file
	* Select the file 
```
/var/VirtualBox/!!YOURUSERNAMEHERE!!/SEED-Default/SEEDUbuntu12.04/SEEDUbuntu12.04.vmdk
```
	* Click `Create`

## Configure the Virtual Machine
5) Click on the newly created VM and click `settings`
	* Under `General` and the `Advanced` tab set clipboard and drag and drop to `Bidirectional`
	* Under `System settings` and the `Processor` tab set it to use 2 processors
	* Under `Network` and the `Adapter 2` tab
		* Click `Enable Network Adapter`
		* Change attached to from `NAT` to `NAT Network`
	* Click OK

6) Verify the machine starts and then power it down

## Cloning

* You should never work from the default machine you created, instead clone the machine incase you make mistakes
* So... When Cloning!
	* Be sure to ***reinitialize the mac address*** of all network cards and ***create a full clone***, not linked

