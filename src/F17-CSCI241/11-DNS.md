% DNS
% Dr. Andrew Besmer

# DNS

## Motivation

* Remembering host names is easier than remembering IP addresses
	* `www.winthrop.edu` 
	* `209.198.12.163`

## DNS History

* Prior to the 80's mapping hosts to their ip addresses was done in `hosts.txt`
* Copies were downloaded to get updates


```txt
127.0.0.1	localhost
127.0.1.1	machinename

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

* What problems might arise with this approach?

## DNS History

* `hosts.txt` file still exists today
	* Useful when developing

```txt
127.0.0.1	localhost
127.0.1.1	machinename
127.0.0.1	nonexistant.com

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```


## DNS

* DNS stands for Domain Name System 
	* Is a distributed, hierarchical, database for providing information about domains.

* Most commonly it takes domains and translates them to their ip address equivalents 
	*  `www.winthrop.edu` => `209.198.12.163` 
	* `209.198.12.163` => `11010001 11000110 00001100 10100011`

## Domain Registration

* Domain names can be obtained from registrars
	* Namecheap
	* Godaddy
	* etc...
* **All** registrars must be authorized by Internet Corporation for Assigned Names and Numbers (ICANN)
	* Non-profit 
	* Controls which domains can be registered 
	* Manages IP addresses



## Domains

* Domains must be registered under one of the top-level domains (TLDs)
* `edu.` and `com.` are considered TLDs
	* Many more exist

## DNS

* Domains are split up by their parts indicated with a `.`
	* `winthrop.edu` is part of `edu.` domain
	* `facebook.com` is part of `com.` domain
* Each part may contain only letters, numbers or hyphens


## DNS

* DNS is made up of a tree structure 
	* Tree is split up based on zones 
	* Each node contains resource records

* All domains require primary and secondary name servers (`NS`)
	* If primary fails, rolls over to secondary



## Resource Records

* Many types of entries, most common:
	* `NS` - Name Server
	* `A` - IPv4 address
	* `AAAA` - IPv6 address
	* `MX` - Mail exchange 
	* `PTR` - Reverse lookup
	* `TXT` - Arbitrary text
	* `CNAME` - Canonical Name (alias)


## DNS 

* Querying can be recursive or iterative

![DNS Recursion](dnsRecursion.svg) [^dnsRecursion]

[^dnsRecursion]: https://commons.wikimedia.org/wiki/File:An_example_of_theoretical_DNS_recursion.svg#/media/File:An_example_of_theoretical_DNS_recursion.svg



## DNS Cardinality 

* DNS is M:N 
	* A host can have multiple ip addresses (`A` records)
		* Load balancing
```
www.winthrop.edu.	627	IN	A	199.79.254.163
www.winthrop.edu.	627	IN	A	209.198.12.163
```

	* An IP address can belong to multiple hosts
		* `winthrop.edu` may not be the same thing as `www.winthrop.edu`
			* Common in early Internet
			* `www` subdomain was where you would "find" the web server
```
winthrop.edu.		495	IN	A	199.79.254.163
```

## Creating Subdomains

* Subdivision allows for many different sub-domains
	* `i.am.a.student.at.winthrop.edu`

* Can create `A` record for subdomains
	* `locations`
	* `*.locations` 
		* Now `rockhill.locations.winthrop.edu` exists

## Configuring Mail 

* Setup `MX` records 
	* Set priority for example, `10`, `20`, `30`
* Lets look at winthrop `MX` records

```bash
dig MX winthrop.edu
```


## DNS

* Responses to queries can be cached
	* Cuts down traffic
	* Increases response time
		* Local Cache
		* Server Cache

* TTL (Time To Live)
	* Specified in seconds
	* Is the answer cached?
	* Has the TTL passed?

## DNS


* Authoritative name servers
	* Authoritative Answers (`AA`)


* Lets look at the name servers for `winthrop.edu`
	* Circular/Glue Records

```bash
dig NS winthrop.edu @a.gtld-servers.net
```


## Reverse Lookup

* What about the other way?
	* `192.203.180.5` is which host?
	* Looks for `PTR` record

```bash
dig -x 192.203.180.5
```

## Configure

* Lets sign into [namecheap](http://www.namecheap.com) and create some records










