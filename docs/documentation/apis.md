---
id: apis
title: Use of dynamic APIs
sidebar_label: Use of dynamic APIs
---

## Demo

[Click here for the demo frontend app](https://safe-dynamic-api-demo-frontend.vercel.app)

[Click here to access the source code of demo frontend app](https://github.com/marcoslimacom/safe-dynamic-api-demo-frontend)

[Sample Mysql database](https://github.com/marcoslimacom/safe-dynamic-api-demo-frontend/blob/master/safe-dynamic-api-demo-mysql-db.sql)

## TreeQL, a pragmatic GraphQL

[TreeQL](https://treeql.org) allows you to create a "tree" of JSON objects based on your SQL database structure (relations) and your query.

It is loosely based on the REST standard and also inspired by json:api.

### CRUD + List

The example posts table has only a a few fields:

    posts
    =======
    id
    title
    content
    created

The CRUD + List operations below act on this table.

#### Create

If you want to create a record the request can be written in URL format as:

    POST /records/posts

You have to send a body containing:

    {
        "title": "Black is the new red",
        "content": "This is the second post.",
        "created": "2018-03-06T21:34:01Z"
    }

And it will return the value of the primary key of the newly created record:

    2

#### Read

To read a record from this table the request can be written in URL format as:

    GET /records/posts/1

Where "1" is the value of the primary key of the record that you want to read. It will return:

    {
        "id": 1
        "title": "Hello world!",
        "content": "Welcome to the first post.",
        "created": "2018-03-05T20:12:56Z"
    }

On read operations you may apply joins.

#### Update

To update a record in this table the request can be written in URL format as:

    PUT /records/posts/1

Where "1" is the value of the primary key of the record that you want to update. Send as a body:

    {
        "title": "Adjusted title!"
    }

This adjusts the title of the post. And the return value is the number of rows that are set:

    1

#### Delete

If you want to delete a record from this table the request can be written in URL format as:

    DELETE /records/posts/1

And it will return the number of deleted rows:

    1

#### List

To list records from this table the request can be written in URL format as:

    GET /records/posts

It will return:

    {
        "records":[
            {
                "id": 1,
                "title": "Hello world!",
                "content": "Welcome to the first post.",
                "created": "2018-03-05T20:12:56Z"
            }
        ]
    }

On list operations you may apply filters and joins.

### Filters

Filters provide search functionality, on list calls, using the "filter" parameter. You need to specify the column
name, a comma, the match type, another commma and the value you want to filter on. These are supported match types:

- "cs": contain string (string contains value)
- "sw": start with (string starts with value)
- "ew": end with (string end with value)
- "eq": equal (string or number matches exactly)
- "lt": lower than (number is lower than value)
- "le": lower or equal (number is lower than or equal to value)
- "ge": greater or equal (number is higher than or equal to value)
- "gt": greater than (number is higher than value)
- "bt": between (number is between two comma separated values)
- "in": in (number or string is in comma separated list of values)
- "is": is null (field contains "NULL" value)

You can negate all filters by prepending a "n" character, so that "eq" becomes "neq".
Examples of filter usage are:

    GET /records/categories?filter=name,eq,Internet
    GET /records/categories?filter=name,sw,Inter
    GET /records/categories?filter=id,le,1
    GET /records/categories?filter=id,ngt,1
    GET /records/categories?filter=id,bt,0,1
    GET /records/categories?filter=id,in,0,1

Output:

    {
        "records":[
            {
                "id": 1
                "name": "Internet"
            }
        ]
    }

In the next section we dive deeper into how you can apply multiple filters on a single list call.

### Multiple filters

Filters can be a by applied by repeating the "filter" parameter in the URL. For example the following URL:

    GET /records/categories?filter=id,gt,1&filter=id,lt,3

will request all categories "where id > 1 and id < 3". If you wanted "where id = 2 or id = 4" you should write:

    GET /records/categories?filter1=id,eq,2&filter2=id,eq,4

As you see we added a number to the "filter" parameter to indicate that "OR" instead of "AND" should be applied.
Note that you can also repeat "filter1" and create an "AND" within an "OR". Since you can also go one level deeper
by adding a letter (a-f) you can create almost any reasonably complex condition tree.

NB: You can only filter on the requested table (not on it's included tables) and filters are only applied on list calls.

### Column selection

By default all columns are selected. With the "include" parameter you can select specific columns.
You may use a dot to separate the table name from the column name. Multiple columns should be comma separated.
An asterisk ("\*") may be used as a wildcard to indicate "all columns". Similar to "include" you may use the "exclude" parameter to remove certain columns:

```
GET /records/categories/1?include=name
GET /records/categories/1?include=categories.name
GET /records/categories/1?exclude=categories.id
```

Output:

```
    {
        "name": "Internet"
    }
```

NB: Columns that are used to include related entities are automatically added and cannot be left out of the output.

### Ordering

With the "order" parameter you can sort. By default the sort is in ascending order, but by specifying "desc" this can be reversed:

```
GET /records/categories?order=name,desc
GET /records/categories?order=id,desc&order=name
```

Output:

```
    {
        "records":[
            {
                "id": 3
                "name": "Web development"
            },
            {
                "id": 1
                "name": "Internet"
            }
        ]
    }
```

NB: You may sort on multiple fields by using multiple "order" parameters. You can not order on "joined" columns.

### Limit size

The "size" parameter limits the number of returned records. This can be used for top N lists together with the "order" parameter (use descending order).

```
GET /records/categories?order=id,desc&size=1
```

Output:

```
    {
        "records":[
            {
                "id": 3
                "name": "Web development"
            }
        ]
    }
```

NB: If you also want to know to the total number of records you may want to use the "page" parameter.

### Pagination

The "page" parameter holds the requested page. The default page size is 20, but can be adjusted (e.g. to 50).

```
GET /records/categories?order=id&page=1
GET /records/categories?order=id&page=1,50
```

Output:

```
    {
        "records":[
            {
                "id": 1
                "name": "Internet"
            },
            {
                "id": 3
                "name": "Web development"
            }
        ],
        "results": 2
    }
```

NB: Since pages that are not ordered cannot be paginated, pages will be ordered by primary key.

### Joins

Let's say that you have a posts table that has comments (made by users) and the posts can have tags.

    posts    comments  users     post_tags  tags
    =======  ========  =======   =========  =======
    id       id        id        id         id
    title    post_id   username  post_id    name
    content  user_id   phone     tag_id
    created  message

When you want to list posts with their comments users and tags you can ask for two "tree" paths:

    posts -> comments  -> users
    posts -> post_tags -> tags

These paths have the same root and this request can be written in URL format as:

    GET /records/posts?join=comments,users&join=tags

Here you are allowed to leave out the intermediate table that binds posts to tags. In this example
you see all three table relation types (hasMany, belongsTo and hasAndBelongsToMany) in effect:

- "post" has many "comments"
- "comment" belongs to "user"
- "post" has and belongs to many "tags"

This may lead to the following JSON data:

    {
        "records":[
            {
                "id": 1,
                "title": "Hello world!",
                "content": "Welcome to the first post.",
                "created": "2018-03-05T20:12:56Z",
                "comments": [
                    {
                        id: 1,
                        post_id: 1,
                        user_id: {
                            id: 1,
                            username: "mevdschee",
                            phone: null,
                        },
                        message: "Hi!"
                    },
                    {
                        id: 2,
                        post_id: 1,
                        user_id: {
                            id: 1,
                            username: "mevdschee",
                            phone: null,
                        },
                        message: "Hi again!"
                    }
                ],
                "tags": []
            },
            {
                "id": 2,
                "title": "Black is the new red",
                "content": "This is the second post.",
                "created": "2018-03-06T21:34:01Z",
                "comments": [],
                "tags": [
                    {
                        id: 1,
                        message: "Funny"
                    },
                    {
                        id: 2,
                        message: "Informational"
                    }
                ]
            }
        ]
    }

You see that the "belongsTo" relationships are detected and the foreign key value is replaced by the referenced object.
In case of "hasMany" and "hasAndBelongsToMany" the table name is used a new property on the object.

### Batch operations

When you want to create, read, update or delete you may specify multiple primary key values in the URL.
You also need to send an array instead of an object in the request body for create and update.

To read a record from this table the request can be written in URL format as:

    GET /records/posts/1,2

The result may be:

    [
            {
                "id": 1,
                "title": "Hello world!",
                "content": "Welcome to the first post.",
                "created": "2018-03-05T20:12:56Z"
            },
            {
                "id": 2,
                "title": "Black is the new red",
                "content": "This is the second post.",
                "created": "2018-03-06T21:34:01Z"
            }
    ]

Similarly when you want to do a batch update the request in URL format is written as:

    PUT /records/posts/1,2

Where "1" and "2" are the values of the primary keys of the records that you want to update. The body should
contain the same number of objects as there are primary keys in the URL:

    [
        {
            "title": "Adjusted title for ID 1"
        },
        {
            "title": "Adjusted title for ID 2"
        }
    ]

This adjusts the titles of the posts. And the return values are the number of rows that are set:

    [1,1]

Which means that there were two update operations and each of them had set one row. Batch operations use database
transactions, so they either all succeed or all fail (successful ones get roled back). If they fail the body will
contain the list of error documents. In the following response the first operation succeeded and the second operation
of the batch failed due to an integrity violation:

    [
        {
            "code": 0,
            "message": "Success"
        },
        {
            "code": 1010,
            "message": "Data integrity violation"
        }
    ]

The response status code will always be 424 (failed dependency) in case of any failure of one of the batch operations.

### Spatial support

For spatial support there is an extra set of filters that can be applied on geometry columns and that starting with an "s":

- "sco": spatial contains (geometry contains another)
- "scr": spatial crosses (geometry crosses another)
- "sdi": spatial disjoint (geometry is disjoint from another)
- "seq": spatial equal (geometry is equal to another)
- "sin": spatial intersects (geometry intersects another)
- "sov": spatial overlaps (geometry overlaps another)
- "sto": spatial touches (geometry touches another)
- "swi": spatial within (geometry is within another)
- "sic": spatial is closed (geometry is closed and simple)
- "sis": spatial is simple (geometry is simple)
- "siv": spatial is valid (geometry is valid)

These filters are based on OGC standards and so is the WKT specification in which the geometry columns are represented.

#### GeoJSON

The GeoJSON support is a read-only view on the tables and records in GeoJSON format. These requests are supported:

    method path                  - operation - description
    ----------------------------------------------------------------------------------------
    GET    /geojson/{table}      - list      - lists records as a GeoJSON FeatureCollection
    GET    /geojson/{table}/{id} - read      - reads a record by primary key as a GeoJSON Feature

The "`/geojson`" endpoint uses the "`/records`" endpoint internally and inherits all functionality, such as joins and filters.
It also supports a "geometry" parameter to indicate the name of the geometry column in case the table has more than one.
For map views it supports the "bbox" parameter in which you can specify upper-left and lower-right coordinates (comma separated).
The following Geometry types are supported by the GeoJSON implementation:

- Point
- MultiPoint
- LineString
- MultiLineString
- Polygon
- MultiPolygon

The GeoJSON functionality is enabled by default, but can be disabled using the "controllers" configuration.

### XML format

This request:

    GET /records/posts/1

Outputs (when "pretty printed"):

    {
        "id": 1,
        "user_id": 1,
        "category_id": 1,
        "content": "blog started"
    }

While (note the "format" query parameter):

    GET /records/posts/1?format=xml

Outputs:

    <root>
        <id>1</id>
        <user_id>1</user_id>
        <category_id>1</category_id>
        <content>blog started</content>
    </root>

This functionality is disabled by default and must be enabled using the "middlewares" configuration setting.

### File uploads

File uploads are supported through the [FileReader API](https://caniuse.com/#feat=filereader), check out the [example](https://gist.github.com/marcoslimacom/eba5cbd4e2fd9f8663cabcdcd54a0900).

## Errors

The following errors may be reported:

| Error | HTTP response code        | Message                          |
| ----- | ------------------------- | -------------------------------- |
| 1000  | 404 Not found             | Route not found                  |
| 1001  | 404 Not found             | Table not found                  |
| 1002  | 422 Unprocessable entity  | Argument count mismatch          |
| 1003  | 404 Not found             | Record not found                 |
| 1004  | 403 Forbidden             | Origin is forbidden              |
| 1005  | 404 Not found             | Column not found                 |
| 1006  | 409 Conflict              | Table already exists             |
| 1007  | 409 Conflict              | Column already exists            |
| 1008  | 422 Unprocessable entity  | Cannot read HTTP message         |
| 1009  | 409 Conflict              | Duplicate key exception          |
| 1010  | 409 Conflict              | Data integrity violation         |
| 1011  | 401 Unauthorized          | Authentication required          |
| 1012  | 403 Forbidden             | Authentication failed            |
| 1013  | 422 Unprocessable entity  | Input validation failed          |
| 1014  | 403 Forbidden             | Operation forbidden              |
| 1015  | 405 Method not allowed    | Operation not supported          |
| 1016  | 403 Forbidden             | Temporary or permanently blocked |
| 1017  | 403 Forbidden             | Bad or missing XSRF token        |
| 1018  | 403 Forbidden             | Only AJAX requests allowed       |
| 1019  | 403 Forbidden             | Pagination Forbidden             |
| 9999  | 500 Internal server error | Unknown error                    |

The following JSON structure is used:

    {
        "code":1002,
        "message":"Argument count mismatch in '1'"
    }

NB: Any non-error response will have status: 200 OK
