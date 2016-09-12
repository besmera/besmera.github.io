% DB Security
% Dr. Andrew Besmer

# DB Security

## Threats

* **CIA**
	* Loss of **confidentiality** - Data is viewed by those who should not view it
	* Loss of **integrity** - Data is inserted or updated by those who should not 
	* Loss of **availability** - Those who have access to data are unable to because the system is unavailable

* These form a "triad"
	* Over balancing one is undesirable

## Protecting Databases

* Countermeasures
	* Inference Control
	* Encryption
	* Access Control
	* Flow Control

## Inference Control

* Databases can be used to provide statistical data on various populations
	* Populations are set of tuples that satisfy selection condition
	* Statistical functions:
		* `AVG()`
		* `SUM()`
		* `COUNT()`
		* `MIN()`
		* `MAX()`
		* `SD()`

## Inference Control

* Populations need to be of sufficient size of inference of individuals data is possible

* Should not be able to determine for example income of one employee
	* Allow only aggregates
	* Allow only on data of sufficient size
	* Allow only on data of sufficient distribution

## Encryption

* Encryption is used to protect sensitive data
	* Information is encoded using an encoding algorithm
	* Unauthorized users have difficulty deciphering 

* Encryption ensures that if access control is compromised data remains protected
	* At least minimally
	* Encryption however is NOT meant to provide access control

## Hashing

* Similar goal but for passwords
	* Minimally protecting passwords in event of theft by storing digest of one way hash

* What is hashing?

## Hashing Functions 

* Commonly used but are fast which is a problem... what?!
	* **SHA1** - 160 bits 40 hex chars (should not be used)
	* **SHA-256** - 256 bits 64 hex chars
	* **SHA-512** - 512 bits 128 hex chars

## Salting

* When hashing passwords should provide a salt
	* Prevents rainbow tables

* Make sure you
	* use salt for each password including updates or resets
	* use 64 bits or 8 bytes minimum

* Generate salts using Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)

```php
//For PHP
$csprnOrSalt = openssl_random_pseudo_bytes(8);
```

## Key Stretching 

* Consider key stretching
	* Increases time and/or memory required to brute force
	* 1000 iterations minimum
	* **PBKDF2** (Password-Based Key Derivation Function) with hashing functions like **SHA-256**

```php
$hash = hash_pbkdf2("sha256", $password, $salt, $iterations);
```

* **bcrypt**, **scrypt**
	* Require look up tables which use main memory
	* Time and memory increase as rounds increase

## A Warning

* Do not use the mysql built in functions to hash!  Do it server side and send to the SQL server. 

> Passwords can be written as plain text in SQL statements such as CREATE USER, GRANT, and SET PASSWORD, or statements that invoke the PASSWORD() function. If these statements are logged by the MySQL server as written, such passwords become available to anyone with access to the logs.

## Bad Example!

* Don't be this guy/girl!
	* What is good?
	* What is bad?

```php
$stmt = $db->prepare("Select * from User where (username, hash) =
(Select username, SHA2(CONCAT(salt, :password), 256) as hash 
FROM User where username = :username)");

$stmt->bindValue(":username", $username);
$stmt->bindValue(":password", $password);

$stmt->execute();
```

## Better Example

```php
$stmt = $db->prepare("Select * from User where username = :username");

$stmt->bindValue(":username", $username);

$stmt->execute();
    
if($stmt->rowCount() == 1){
	$row = $stmt->fetch(PDO::FETCH_ASSOC);

	$passToCheck = $row["salt"] . $password;
	
	//Plain text password never leaves server, not in MySQL logs...
	if(hash("sha256", $passToCheck) == $row["hash"]) {
		//Yes!
	}
	else
	{
		//No!
	}
}
```

# The DBA

## The DBA

* The DBA is the central authority for managing a DBMS
	* Grants privileges to users who need to use the system
	* Classifies data and users according to set policy
	* DBA is responsible for overall security of the DBMS

* DBA obviously has many other roles besides security

## The DBA

* DBA has special account sometimes called system or root or superuser account
	* Akin to "root" or "Administrator" on linux/windows
	* These accounts can 
		* Create accounts
		* Grant privileges - DAC
		* Revoke privileges - DAC
		* Assign security levels - MAC only


## Access Control

* Access to the DBMS is separate from access to the database
	* DBA will create account if they need access to the DBMS
	* The DBA can not explicitly specify a user should be denied access to connect
		* Because of 2 stage access control (later)
	* They can then grant privileges system wide or to specific databases


## Access Control

* Two types of DB security mechanisms
	* **DAC** - Discretionary Access Control
		* Characterized by high degree of flexibility
		* Suitable for a large number of applications
	* **MAC** - Mandatory Access Control
		* Administrator dictates policies
		* Very rigid policies not easily modifiable
		* Oracle security labels

## DAC - Privileges

* Generally though about in terms of **access control matrix** `M`
	* The **rows** of the matrix represents **subjects**
		* User accounts
	* The **columns** of the matrix represent **objects**
		* Relations
		* Records
		* Columns
		* Views 
	* Each position `M[s,o]` in matrix represents the type of privileges (`read`, `write`, `update`) that subject `s` holds on object `o`

## DAC - Privileges

* There are multiple levels of privileges
	* Account level
		* DANGER!
		* User can perform these operations independent of any database
		* For example, `SELECT` at the account level can select from any database or table
	* Relation (or table) level
		* User can perform operations on specific table, view, etc...

```sql
GRANT SELECT, INSERT ON *.* TO 'andrew'@'%'; --account
GRANT SELECT, INSERT ON company.* TO 'andrew'@'%'; --database
GRANT SELECT, INSERT ON company.employee TO 'andrew'@'%'; --table

GRANT ALL ON *.* TO 'andrew'@'%'; --AHH!
```


## DAC - Privileges

* Account level
	* `CREATE SCHEMA`
	* `CREATE VIEW`
	* `ALTER`
Adding/Removing Attributes
	* `DROP`
Relations/Views
	* `MODIFY`
		* `INSERT`/`DELETE`/`UPDATE`
	* `SELECT`

## DAC - Privileges

* Relation level
	* Base Relations (Tables) or Views
		* `SELECT`
		* `MODIFY`
* Only want a user to be able to see the name, birthday and address for the engineering department?
	* Create a view showing only that
	* Grant that user SELECT on it

## DAC - Privileges

* Each relation `R` in database is assigned an owner 
	* Owner has all privileges on that relation
	* Owner can pass privileges on any of the objects they own
	* Use `GRANT OPTION` to allow those users to continue to pass privileges
	* Not using `GRANT OPTION` = MAC

## Privilege Revocation

* Suppose `A` is owner of `EMPLOYEE`

```sql
GRANT SELECT ON EMPLOYEE, DEPARTMENT TO B WITH GRANT OPTION;
```

* Now `B` grants `C` access.

## Privilege Revocation

* What should happen if `A` revokes `B`'s privilege?

```sql
REVOKE SELECT ON EMPLOYEE FROM B;
```

## Limits on Propagation

* Techniques exist for example:
	* **Horizontal propagation** - a given user can grant to at most `i` users
	* **Vertical propagation** - maximum depth ie. for `i=2`
		* A->B 
		* B->C
		* C->D - Not allowed...

* Not implemented in almost all DBMS

## MAC - Privileges

* Bell-LaPadula -  Each subject/object classified into one class
	* Read down, Write Up

* Typical Security Classes:
	* TS - Top Secret
	* S - Secret
	* C - Confidential
	* U - Unclassified
	* TS ≥ S ≥ C ≥ U

## MAC - Privileges

* Two restrictions
	* **Simple security property** - A subject `S` is not allowed to read access to object `O` unless `class(S) ≥ class(O)`
	* **Star Property** - A subject `S` is not allowed to write an object `O` unless `class(O) ≥ class(S)`

* Different levels have different "views" of the DB
* No notion of a given user giving TS access to another user... thus MAC

## Covert Channels

* **Covert channel** allows transfer of information that violates security policy
	* The ability to write up or deny read implies an object actually exists

* Two broad types
	* Storage (previous example)
	* Timing - I.E. denied access quicker when object does not exist

# MySQL Specific

## MySQL Specific

* Newer MySQL can limit users:
	* Queries per hour
	* Updates per hour
	* Number of concurrent sessions

```sql
GRANT ALL ON company.* TO 'andrew'@'%' WITH 
MAX_QUERIES_PER_HOUR 100 MAX_UPDATES_PER_HOUR 100;
```

## MySQL Storage

* If you are MySQL where would you store your access control information?

## MySQL

* MySQL has a database `mysql`

* User tables loaded into memory when server starts
	* If you use `CREATE USER`, `SET PASSWORD` auto reloaded
	* If you manually `INSERT`, `UPDATE` to table requires restart or "flushing privileges"



## 2 Stage Access Control

* MySQL security split into two "stages"
	* Stage 1 - Connection Verification
	* Stage 2 - Request Verification

## Stage 1

* User is defined by both a name and host
* `'andrew'@'aspen.winthrop.edu'`
* `'andrew'@'%'`

* These are two completely different users
* Permissions assigned to each individually

* MySQL matches based on most specific host to least specific

## Stage 1

* For example
	* `'%'@'aspen.winthrop.edu'`
	* `'andrew'@'%'`

* Which user is used if I connect from the aspen server using username 'andrew'?
* What about from abernathy?

## Stage 1

* So... If you experience permission problems check your current user... 

```sql
SELECT CURRENT_USER();
```

## Creating Users

* Creating users for Stage 1

```sql
CREATE USER 'databases'@'localhost' IDENTIFIED BY 'csci355';
-- vs 
CREATE USER 'csci355'@'localhost';
-- vs
CREATE USER 'databases'@'%' IDENTIFIED BY 'csci355';
-- vs
CREATE USER 'csci355'@'%';
```


## Stage 2

* Access checked by:
	* global privileges
	* OR (database privileges AND host privileges)
	* OR table privileges
	* OR column privileges

* For dev setups I like to 
	* Create users using the host `'%'`
	* Grant all privileges to databases matching `username_%`

