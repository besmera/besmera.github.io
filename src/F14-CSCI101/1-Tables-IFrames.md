% Tables & IFrames
% Dr. Andrew Besmer

# Tables

## Tables

* What do you use tables for?
* HTML tables are for display only
* Interactivity is JavaScript

## Tables

* Lets look at how tables are structured?

## Tables

* Just like `html` has a `head` and `body`
* A `table` has 
	* A table head `thead`
	* A table body `tbody`
	* Table rows `tr`
	* Table headings `th`
	* Table data `td`

## Tables 

* Lets start by adding the `table` element

```html
<table>
</table>
```

## Tables 

* Inside the `table` we will put our `thead` that contains the headings for our data

```html
<table>
	<thead>
	</thead>
</table>
```

## Tables 

* Inside the `thead` we will put a row `tr` to hold our headings

```html
<table>
	<thead>
		<tr>
		</tr>
	</thead>
</table>
```
## Tables 

* Inside the row we will put table headings `th` 

```html
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Favorite Food</th>
		</tr>
	</thead>
</table>
```

## Tables

* An important concept to note is what is happening to the table headings inside the row...
	* They are occupying 1 column each!

```html
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Favorite Food</th>
		</tr>
	</thead>
</table>
```


## Tables 

* Now we are ready for the tables body `tbody`

```html
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Favorite Food</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>
```

## Tables 

* We will again need a row

```html
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Favorite Food</th>
		</tr>
	</thead>
	<tbody>
		<tr>
		</tr>
	</tbody>
</table>
```

## Tables 

* Now instead of table headings we will put the actual table data `td`

```html
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Favorite Food</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Alice</td>
			<td>Pizza</td>
		</tr>
	</tbody>
</table>
```

## Tables 

* We can add as many rows as we want...

```html
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Favorite Food</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Alice</td>
			<td>Pizza</td>
		</tr>
		<tr>
			<td>Bob</td>
			<td>Ice Cream</td>
		</tr>
	</tbody>
</table>
```

## Tables 

* Feel free to add a `caption`

```html
<table>
	<caption>Favorite Foods</caption>
	<thead>
		<tr>
			<th>Name</th>
			<th>Favorite Food</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Alice</td>
			<td>Pizza</td>
		</tr>
		<tr>
			<td>Bob</td>
			<td>Ice Cream</td>
		</tr>
	</tbody>
</table>
```

## Tables 

* Setting the `border` attribute to `1` (turned on) should help you see the table easier
	* We should really do this in CSS but we don't know CSS yet... 

```html
<table border="1">
	<caption>Favorite Foods</caption>
	<thead>
		<tr>
			<th>Name</th>
			<th>Favorite Food</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Alice</td>
			<td>Pizza</td>
		</tr>
		<tr>
			<td>Bob</td>
			<td>Ice Cream</td>
		</tr>
	</tbody>
</table>
```



# IFrames

## IFrames

* Webpage within a webpage
* Why?

```html
<iframe src="https://www.winthrop.edu"width="700" height="500"></iframe>
```

\ 

<iframe src="https://www.winthrop.edu"width="700" height="500"></iframe>

## IFrames

* Winthrop's Facebook Likes

```html
<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.winthrop.edu&amp;width&amp;layout=standard&amp;action=like&amp;show_faces=true&amp;share=true&amp;height=80&amp;appId=351918688226073" 
scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:80px;" 
allowTransparency="true"></iframe>
```

\ 

<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.winthrop.edu&amp;width&amp;layout=standard&amp;action=like&amp;show_faces=true&amp;share=true&amp;height=80&amp;appId=351918688226073" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:80px;" allowTransparency="true"></iframe>

## IFrames

```html
<iframe width="560" height="315" 
src="//www.youtube.com/embed/UE5p1OZUjPA" 
frameborder="0" allowfullscreen></iframe>
```

\ 

<iframe width="560" height="315" src="//www.youtube.com/embed/UE5p1OZUjPA" frameborder="0" allowfullscreen></iframe>


