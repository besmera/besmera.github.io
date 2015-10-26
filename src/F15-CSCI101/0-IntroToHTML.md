% Intro To HTML
% Dr. Andrew Besmer

# Origin

## Timeline

* **1989** - First HTML page! Tim Berners-Lee
* **1993** - Research center created Mosaic browser
	* Supports images, etc...
* **1994** - W3C or World Wide Web Consortium
	* **1995** - HTML 2.0
	* **1997** - HTML 3.2 & 4.0
	* **1999** - HTML 4.01
	* **2008** - HTML5

# HTML

## HTML

HTML
:   HyperText Markup Language - A language used to annotate (markup) content

* Webpage 
	* **HTML** - Structure & Semantics
	* **CSS** - Presentation
	* **JavaScript** - Interactivity

## HTML

* HTML is made up of tags
* Basic tag parts
	1. `<` - Less than sign
	2. TAG - The HTML tag
	3. `>` - Greater than sign
* Easiest HTML tag... `<html>`


## HTML

* Recall HTML purpose (structure/semantics)
* To accomplish this most tags require a: 
	* Start tag `<html>`
	* End tag `</html>`
		1. `<` - Less than sign
		2. `/` - Forward slash
		3. TAG - The HTML tag
		4. `>` - Greater than sign
		

## HTML

* Tags surround everything they apply to
* What is this tag describing?

```html
<address>701 Oakland Ave. Rock Hill, SC 29733</address>
```

## HTML

* HTML is generally stored in a file that ends in `.html`
* Many students forget the `.html`!

# Minimal HTML

## Minimal HTML

* Minimum needed for valid HTML:

```html
<!DOCTYPE html>
<html>
	<head>
		<title></title>
	</head>

	<body>

	</body>
</html> 
```

## DOCTYPE

* `DOCTYPE` is actually not an HTML tag
	* Declaration of what follows
	* Used by browser to "understand" the rest of the page

```html
<!DOCTYPE html>
```

## HTML

* `html` tag is used to surround all other html
	* should be first opening tag and last closing tag

```html
<!DOCTYPE html>
<html>
</html> 
```

## HEAD

* `head` tag contains information for the webpage
	* title
	* css
	* meta 
	* ...
* None of this should be visible[^titleException]

[^titleException]: The `title` tag content is visible as the text shown in the browser tab.

```html
<!DOCTYPE html>
<html>
	<head>
	</head>
</html> 
```

## Title

* The `title` tag is used to name the webpage
	* This same name is used to label the tab in your browser
	* **Must** be located inside the `head`

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Cars</title>
	</head>
</html> 
```

## Body

* `body` tag is used to hold of all the content, particularly visible content
* The `body` tag does not belong inside the `head`, it is below it at the same level

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Cars</title>
	</head>

	<body>
		This can be seen on the page!
	</body>
</html> 
```

## HTML

* HTML does not care about
	* White space
	* CRLF (carriage return line feeds) 
* Why?

```html
..
	<body>
		This can be seen on the page!
	</body>
..
```

* is the same as

```html
..
	<body>
		This can be seen 



		on the page!
	</body>
..
```

## HTML

* How should you format code?

\ 

* Use indentation to represent nesting

```html
<ul>
	<li>Some item</li>
	<li>Some other item</li>
</ul>
```

* Use all lowercase or uppercase for all tags (except `DOCTYPE`)[^DOCTYPENote]
	* Most use all lower


[^DOCTYPENote]: Browsers should allow you to use whatever case you like.  However `DOCTYPE` would be canonical so should be used.


## Practice

* Lets practice!

# Body

## Heading Tags

* Heading tags
* There are six levels
	* `h1`,`h2`,`h3`,`h4`,`h5`,`h6`
* These are **NOT** used to make text bigger or smaller
	* The default behavior of most browsers does that
	* Professional designers will use a 'css reset'

## Heading Tags

* Example

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Cars</title>
	</head>

	<body>
		<h1>Cars</h1>
		..
		<h2>Compact</h2>
		..
		<h3>Ford Focus</h3>
		..
		<h3>Honda Civic</h3>
		..
		<h2>Midsize</h2>
		..
		<h3>Chevy Malibu</h3>
		..
		..
	</body>
</html> 
```

## Paragraphs

* `p` tag is used to indicate content is paragraph text
* A very common mistake is to put a number at the `p` tag 
	* ~~`<p2>`~~ - Don't do this!

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Cars</title>
	</head>

	<body>
		<h1>Cars</h1>
		<p>This is my first paragraph.</p>
		<p>This is my second paragraph.</p>
	</body>
</html> 
```



## Style

* Anyone ever use the `<b>` tag?

```html
This is <b>so</b> important.
```




## Style

* Don't do it! Anyone know why?

> * Can use `<strong>` instead, why is this better?

> * Use `<i>`? Don't! Use `<em>`, why is this better?


## Lists

* Lists can be
	* `ul` - Unordered Lists
	* `ol` - Ordered Lists
* Which to use for:
	* Colors for a product?
	* Winners of a race?
	* States in the US?

## Lists

* What goes inside lists? List Items!
	* `li` - List Item
	* Each list item should have it's own start and close tag
	* All items should be surrounded with the `ul` or `ol`

## Lists

* Unordered Example

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Cars</title>
	</head>

	<body>
		<h1>Cars</h1>
		<ul>
			<li>Honda Civic</li>
			<li>Chevy Malibu</li>
		</ul>
	</body>
</html> 
```

## Lists

* Ordered Example

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Race Results</title>
	</head>

	<body>
		<h1>Race Results</h1>
		<ol>
			<li>Alice</li>
			<li>Bob</li>
			<li>Trudy</li>
		</ol>
	</body>
</html> 
```

## Nested Lists

* Lists can be located inside other lists!

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Race Results</title>
	</head>

	<body>
		<h1>Race Results</h1>
		<ol>
			<li>Alice</li>
			<ul>
				<li>Time: 2min 32sec</li>
			</ul>
			<li>Bob</li>
			<li>Trudy</li>
		</ol>
	</body>
</html> 
```

## Links

* The web would not be the web without links!
* We can create an anchor tag `<a>`

```html
Do you want to search <a>Google</a>?
```

* What is missing?

## Links

* Attributes are used to modify tags
* Many attributes can be set on a single tag
* For anchors we want to specify the `href` or the hypertext reference
	* What would href be for the anchor below?

```html
Do you want to search <a>Google</a>?
```

## Links 

* Attributes are added inside the opening tag right after the tag name (not closing!)
	* A single space
	* name - The name of the attribute you are setting
	* `=` - Separates the attribute name from the value
	* `"` - A double quote indicates start of the value
	* value - What should the attribute be set to
	* `"` - A double quote indicates end of the value

```html
<a href="http://www.google.com">Google</a>
```

## Links

* `href` can be absolute or relative
	* Relative to where you are
		* My office is room 304
		* default.htm
	* Absolute is fully qualified
		* My office is Thurmond 304
		* http://faculty.winthrop.edu/besmera/default.htm

## Links

* It can be undesirable to open a link in the same tab
* Why?

## Links

* To open a link in a new window set the `href` to `_blank`
* Try it!

## Images

* Images can be specified using the `img` tag
* Two attributes should generally be set
	* `src` - Source of the image (relative/absolute)
	* `alt` - Alternative text for the image. Why?


```html
<img src="" alt="">
```

## Images

* Example

```html
<img src="http://www.winthrop.edu/uploadedImages/president/library/Tillman.jpg" alt="Winthrop is located in Rock Hill, SC.">
```

* Notice anything missing?


