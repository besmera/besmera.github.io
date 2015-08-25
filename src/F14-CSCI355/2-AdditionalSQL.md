% Additional SQL
% Dr. Andrew Besmer

# NULLs

## Meaning

* Recall meaning of `NULL`
	* Not Applicable
	* Unavailable (Applicable but withheld)
	* Unknown value

* Each `NULL` is considered to be different from every other NULL [^ExceptAgg]

```sql
SELECT * FROM Product WHERE Category = NULL; 
```

[^ExceptAgg]: Except when aggregating.


## Comparisons

* When being evaluated `NULL`s have three valued logic
	* I find it helpful to think about it as a placeholder

## AND

|       | **TRUE**  | **FALSE** | **NULL**  |
|-------|-------|-------|-------|
| **TRUE**  | TRUE  | FALSE | NULL  |
| **FALSE** | FALSE | FALSE | FALSE |
| **NULL**  | NULL  | FALSE | NULL  |

## OR

|       | **TRUE** | **FALSE** | **NULL** |
|-------|------|-------|------|
| **TRUE**  | TRUE | TRUE  | TRUE |
| **FALSE** | TRUE | FALSE | NULL |
| **NULL**  | TRUE | NULL  | NULL |

## NOT

| In    | Out   |
|-------|-------|
| TRUE  | FALSE |
| FALSE | TRUE  |
| NULL  | NULL  |

## Comparisons

* Can use `IS NULL` or `IS NOT NULL` when looking to compare in `WHERE` clause
	* Returns `TRUE` or `FALSE` instead of `NULL`
* What question am I asking the database?

```sql
SELECT * FROM Product WHERE Category IS NULL; 
```

# Aggregation

## Aggregate Functions

* `COUNT()` - Count items in a **group**

\ 

* `SUM()` - Sum items in a group

\ 

* `AVG()` - Average items in a group
* `STD()` - Std Dev of items in a group

\ 

* `MIN()` - Min of items in a group
* `MAX()` - Max of items in a group

## NULLs w/Aggregation

* During aggregation on a column `NULL`s are simply discarded

```sql
SELECT COUNT(*) FROM Product;
```

vs


```sql
SELECT COUNT(Company) FROM Product;
```

## IN Operator

* Comparison operator `IN`
	* Compares value $v$ with a set (or multiset) of values $V$
	* Evaluates to `TRUE` if $v \in V$
* Useful with nested queries!

```sql
SELECT * FROM Product WHERE Company IN (1,2);
```

```sql
SELECT * FROM Product WHERE (Company,Category) IN ((1,1),(1,2));
```

# Subquery

## Subquery

Subquery
:   SQL query within another query

* Identify *inner/sub query* and *outer query*

```sql
SELECT Company.Name FROM Company 
WHERE Company.id IN (Select Product.Company 
		FROM Product WHERE Product.Price > 15.00);
```

same as

```sql
SELECT Company.Name FROM Company, Product 
WHERE Company.id = Product.Company 
AND Product.Price > 15.00;
```

## Subquery

* Can you put them in a `FROM` clause?

. . . 


* Must alias the subquery table
	* Avoids ambiguities with other tables
* Can perform same operations as if table existed

```sql
SELECT * FROM (Select * FROM Product) AS P;
```

## Correlated

Correlated Query
:   Inner/subquery references a row in the outer query

* Evaluated once ***for each row*** in the outer

```sql
SELECT * FROM Product AS P WHERE P.Price > (Select AVG(Product.Price) FROM Product WHERE Product.Category = P.Category);
```

## Exists

* `EXISTS` Checks for the existence of any results in the nested query
	* Example is correlated

```sql
SELECT * FROM Company WHERE EXISTS 
(Select * FROM Product WHERE Product.Company = Company.id);
```

* What would NOT EXISTS do then?

# Grouping

## GROUP BY

* `GROUP BY` Partitions results into subsets of tuples based on the grouping attributes
	* Aggregate functions are applied independently to each group

* `NULL`s get their own group
	* Does this query make sense then?

```sql
SELECT Company, AVG(Price) FROM Product GROUP BY Company;
```

## Practice

1) Get ***all the company names*** and the ***average price of their products***.
2) Get ***all the company names*** and the ***average price of their products***.  ***Don't discard the NULL*** (missing companies) avg price. 
	* ***Hint:*** `FULL OUTER`

## HAVING

* `HAVING` Provides a condition on the summary information, **applied after grouping**
	* Can use aggregate functions in the `HAVING` but not `WHERE`

```sql
SELECT Company, AVG(Price) FROM Product GROUP BY Company HAVING Company = 1;
```

or

```sql
SELECT Company, AVG(Price) FROM Product 
GROUP BY Company HAVING AVG(Price) < 15.00;
```

## Practice 

1) Modify the last query (shown below) to output the company name and average price instead of just the id.

```sql
SELECT Company, AVG(Price) FROM Product 
GROUP BY Company HAVING AVG(Price) < 15.00;
```

# Summary

## Summary

1) Cartesian product of tables `FROM` & `JOIN`
2) Iterate over each row 
	2) Check selection condition `WHERE` & `ON`
3) Partition into groups `GROUP BY`
4) Iterate over each group 
	4) Check grouping condition `HAVING`
5) Order rows `ORDER BY`
6) Project attributes/columns `SELECT`

```sql
SELECT <projection attribute(s)>
FROM <table(s)>
[WHERE <condition(s)>]
[GROUP BY <attribute(s)>]
[HAVING <group condition>]
[ORDER BY <attribute list>];
```


