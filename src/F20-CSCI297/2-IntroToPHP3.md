% Intro to PHP 2
% Dr. Andrew Besmer


# Superglobals

## Typical Data Access

* Data is typically passed from the web server process by inserting that data into so called "superglobals"
* Data may also be inside files or databases

## \$\_GET/\$\_POST

* The superglobals `$_GET` and `$_POST` contain the name value pairs sent as part of a GET/POST request from your form[^XSS]

```php
<?php
$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
?>
<html> 
	<head>
		<title>Hello <?php echo $firstName . " " . $lastName . "!"; ?></title>
	</head>
	<body> 
		<form method="POST" action="hello.php"> 
			First Name: <input type="text" name="firstName"></input><br /> 
			Last Name: <input type="text" name="lastName"></input>
			<input type="submit" value="submit" name="submit">
		</form>
	</body>
</html>
```

[^XSS]: XSS has been left in example for simplicity.

<div class="notes">
This is some notes
</div>
