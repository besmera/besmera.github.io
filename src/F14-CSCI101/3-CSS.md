% CSS
% Dr. Andrew Besmer

# CSS

## Purpose

[^CSS]: Based on slides by Pam Fox

CSS
:   Cascading Style Sheets[^CSS]

* CSS is about changing the look and feel of your site
	* Color
	* Background Color
	* Size
	* Location
	* Style

## Creating CSS

* Add CSS within a `style` tag
* The `style` tag should be inside the `head` tag

```html
<!DOCTYPE html>
	<html>
	<head>
		<title>My Page</title>
		<style>
			/* CSS Goes here! */
		</style>
	</head>
	<body>
	</body>
</html>
```

## CSS Syntax

* CSS is a set of style rules
	* **Selector** selects elements to style
	* **Declarations** define what that style is using property (key) value pairs

```css
selector {
	property: value;
	property: value;
}
```

```css
body {
	color: white;
	background-color: black;
}
```

## Example


```html
<!DOCTYPE html>
	<html>
	<head>
		<title>My Page</title>
		<style>
			body {
				color: white;
				background-color: black;
			}
		</style>
	</head>
	<body>
	</body>
</html>
```

# Selectors 

## Selector Types

1. element
2. id
3. class
4. position

## Element Selector

* Based on the html elements you have learned (`p`,`ul`,`li`,`input`,...)
* To style all the paragraphs on a page

```css
p {
}
```

## Id Selector

* Can define an `id` attribute on elements
	* Id is unique and can be used at most 1 time
	* Very specific!
* Use `#` to indicate that selector is an id
	* Must match exactly

```html
<p id="aboutCSCI101">CSCI 101 is a class at Winthrop Univ...</p>
```

```css
#aboutCSCI101 {

}
```

## Class Selector

* Because id selectors are so limiting (only one) we use class selectors to make reusable style
* Set an attribute `class` on elements
* Can set as many as you like on same element or reuse across as many as you like

## Class Selector

* This paragraph has one class defined

```html
<p class="warning">Watch out!</p>
```

## Class Selector

* This paragraph has two classes defined
* Select using either, both, or even separately
* A `.` is used to indicate the selector is a class

```html
<p class="warning danger">Watch out!</p>
```

```css
.warning {
	/* Anything with warning class */
}

.warning, .danger {
	/* Anything with either class notice the , */
}

.danger {
	/* Anything with danger class */
}
```

## Position 

* Uses a combination of other selectors separated by a space
* For example, `ul em` says find any and all `ul` elements then look for `em` elements that are inside the `ul` elements you found

## Position

* Position example

```css
ul em {
}
```

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My Site</title>
	</head>
	<body>
		<ul>
			<li><em>Selects me</em></li>
		</ul>
			<p><em>But not me</em></p>
	</body>
</html>
```

## Rule Priority

* Which rule would apply if multiple selectors match
	* All unless there is conflict
* Conflicts resolved
	* Most specific wins
	* Equally specific implies last one should apply

# Properties

## Properties

* We will cover
	* `color`
	* `background-color`
	* `font-size`
	* `font-weight`
	* `text-align`
* There are [tons more](http://www.w3schools.com/cssref/)

## Color

* Can set color using [hex codes](http://www.w3schools.com/tags/ref_colorpicker.asp) or common color names like `red`, `green`, or `blue`
* Example of each below (both are red)


```css
body {
	color: red;
}

p {
	color: #FF0000;
}
```

## Background Color

* <span style="background-color: yellow;">Can change the background color using the same common name or hex codes.</span>
* How could you change the background of a whole page?

```css
.remember {
	background-color: yellow;
}
```

## Font Size

* Can change the font size to be <span style="font-size: 2em;">larger</span> or <span style="font-size: .5em;">smaller</span>
* Can use a variety of measurements:
	* Pixels - `12px` (bad)
	* Percentages - `200%` (good)
	* Em (pronounced M) - `2em` (best)

```css
.big {
	font-size: 2em; /* Double normal size */
}

.small {
	font-size: .5em; /* Half normal size */
}
```

## Font Weight

* Can make text <span style="font-weight: bolder;">bolder</span> or <span style="font-weight: lighter;">lighter</span>
* Finer grained control can be done by using a `100`, `200`, ..., `800`, or `900` value from lightest to darkest

```css
.intense {
	font-weight: 900;
}

.mild {
	font-wight: 100;
}

.fierce {
	font-weight: bolder;
}

.calm {
	font-weight: lighter;
}
```

## Text Align

* Can make your text aligned 
	* <span style="display:block; text-align: right;">`right`</span>
	* <span style="display:block; text-align: left;">`left`</span>
	* <span style="display:block; text-align: center;">`center`</span>
	* <span style="display:block; text-align: justify;">`justify` for large amounts of text that may wind up spanning multiple lines.  This text can be justified using the `text-align` feature!</span>

```css
.mainTitle {
	text-align: center;
}
```

