f (!require(RMySQL)) { install.packages("RMySQL") }

library(RMySQL)
require(RMySQL)

# Create a connection object to MySQL DB

mysqlconnection = dbConnect(MySQL(), user = 'root', 
						password = 'test0147',
						dbname = 'rtests',
						host = 'localhost')

# List available tables in this database.
dbListTables(mysqlconnection)

# Querying

# Query the "user" tables to get all rows
result = dbSendQuery(mysqlconnection, "select * from user")

# Store the Result in an R data frame object. n = 5 to get 1st 5 rows 
data.frame = fetch(result, n = 5);
print(data.frame)

# Query with Filter Clause
result = dbSendQuery(mysqlconnection, "select * from user where insert_priv = 'Y'")

# Result has to be cleared before reuse.
	# dbClearResult() must be used to clear results before reuse
# Fetch all with n as neg 1
data = fetch(result, n = -1)
print(data)

# CREATION OF TABLES
#make a connectionobject to the db
mysqlconn = dbConnect(MySQL(), user = 'root', 
					password = 'test0147', 
					dbname = 'rtests',
					host = 'localhost')

# Use the R data.frame "name" to make the table in mysql
# All the rows of "name" are taken into mysql
 dbWriteTable(mysqlconn, "names", names[, ], overwrite = TRUE)

# WHAT ABOUT just using dbSendQuery (it dont need to return nothing)
dbSendQuery(mysqlconn, "create table names(
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	birth_date DATE,
	PRIMARY KEY (id) );"
)

	# IT WORKS

# INSERTION

dbSendQuery(mysqlconn, "insert into names(first_name, last_name)
	values('Bob', 'Robert')"
)

	#this works too 
result = dbSendQuery(mysqlconn, "select * from names")

d.frame = fetch(result, n = -1)

print(d.frame)


