# Session 3 API Documentation

This is the API documentation for the AEC 2024 Skill 08 Session 3 API.

## Preceding Notes

- A question mark (`?`) in the documentation indicates that the parameter is optional.
- Every endpoint (except for the authentication endpoint) requires the user to be authenticated.
- When a request body contains a file, the request must be sent as `multipart/form-data`.

## Authentication

The API uses a simple authentication mechanism. The user must provide a valid username to access the API. The username is sent as a JSON object in the request body. The API will respond with a JSON Web Token (JWT) that must be included in the `Authorization` header of all subsequent requests using the `Bearer` scheme. Additionally, the API will respond with the user's ID, which is required to access the authenticated user's profile.

<details>
  <summary>View details</summary>

```
POST /auth/login
```

Request Body

```
{
  username: string
}
```

Example Response

```json
{
  "id": 2,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYmVuamFtaW5fZnJvc3QiLCJpYXQiOjE3MTUwMjY5MjYsImV4cCI6MTcxNzYxODkyNn0.gAm5sI5V2gzIE49_RQAbgBW3zVINHCKd0xaRWT6bwKY"
}
```

</details>

## Users

The API provides endpoints to get a user's profile and their posts. It also allows updating the profile of the authenticated user.

### Get User Profile

<details>
  <summary>View details</summary>

```
GET /users/:id
```

Example Response

```json
{
  "id": 1,
  "createdAt": "2024-05-06T20:22:06.286Z",
  "updatedAt": "2024-05-06T20:22:06.286Z",
  "username": "benjamin_frost",
  "caption": null,
  "imageUrl": null,
  "posts": [
    {
      "id": 1,
      "createdAt": "2024-05-06T20:53:30.271Z",
      "updatedAt": "2024-05-06T20:53:30.272Z",
      "imageUrl": "/static/uploads/dd229dab-84b2-4000-879e-a38dbb1c8796.jpeg",
      "caption": "This is my first post!",
      "author": 1,
      "stickers": [
        {
          "name": "a",
          "x": "0.5",
          "y": "-0.25",
          "rotation": "15"
        },
        {
          "name": "b",
          "x": "0.33",
          "y": "0",
          "rotation": "0"
        }
      ],
      "location": {
        "latitude": 41.40338,
        "longitude": 2.17403
      },
      "likedBy": [
        {
          "id": 1,
          "createdAt": "2024-05-06T20:22:06.286Z",
          "updatedAt": "2024-05-06T20:22:06.286Z",
          "username": "benjamin_frost",
          "caption": null,
          "imageUrl": null
        }
      ],
      "comments": [
        {
          "id": 1,
          "createdAt": "2024-05-06T21:25:22.152Z",
          "updatedAt": "2024-05-06T21:25:22.152Z",
          "text": "Some comment",
          "author": {
            "id": 1,
            "createdAt": "2024-05-06T20:22:06.286Z",
            "updatedAt": "2024-05-06T20:22:06.286Z",
            "username": "benjamin_frost",
            "caption": null,
            "imageUrl": null
          },
          "post": 1
        }
      ]
    }
  ]
}
```

</details>

### Update User Profile

<details>
  <summary>View details</summary>

```
PATCH /users/:id
```

Request Body

```
{
  caption?: string,
  image?: File
}
```

</details>

## Posts

The API provides endpoints to retrieve all posts, like a post, unlike a post, comment on a post, create a new post, and get available stickers.

### Get All Posts

<details>
  <summary>View details</summary>

```
GET /posts
```

Example Response

```json
[
  {
    "id": 1,
    "createdAt": "2024-05-06T20:53:30.271Z",
    "updatedAt": "2024-05-06T20:53:30.272Z",
    "imageUrl": "/static/uploads/dd229dab-84b2-4000-879e-a38dbb1c8796.jpeg",
    "caption": "This is my first post!",
    "author": {
      "id": 1,
      "createdAt": "2024-05-06T20:22:06.286Z",
      "updatedAt": "2024-05-06T20:22:06.286Z",
      "username": "benjamin_frost",
      "caption": null,
      "imageUrl": null
    },
    "stickers": [
      {
        "name": "a",
        "x": "0.5",
        "y": "-0.25",
        "rotation": "15"
      },
      {
        "name": "b",
        "x": "0.33",
        "y": "0",
        "rotation": "0"
      }
    ],
    "location": {
      "latitude": 41.40338,
      "longitude": 2.17403
    },
    "likedBy": [
      {
        "id": 1,
        "createdAt": "2024-05-06T20:22:06.286Z",
        "updatedAt": "2024-05-06T20:22:06.286Z",
        "username": "benjamin_frost",
        "caption": null,
        "imageUrl": null
      }
    ],
    "comments": [
      {
        "id": 1,
        "createdAt": "2024-05-06T21:25:22.152Z",
        "updatedAt": "2024-05-06T21:25:22.152Z",
        "text": "Some comment",
        "author": {
          "id": 1,
          "createdAt": "2024-05-06T20:22:06.286Z",
          "updatedAt": "2024-05-06T20:22:06.286Z",
          "username": "benjamin_frost",
          "caption": null,
          "imageUrl": null
        },
        "post": 1
      }
    ]
  },
  {
    "id": 2,
    "createdAt": "2024-05-06T20:54:39.213Z",
    "updatedAt": "2024-05-06T20:54:39.213Z",
    "imageUrl": "/static/uploads/3037f4d9-a335-434c-b5c3-62cf1d181c64.jpeg",
    "caption": "This is my second post!",
    "author": {
      "id": 1,
      "createdAt": "2024-05-06T20:22:06.286Z",
      "updatedAt": "2024-05-06T20:22:06.286Z",
      "username": "benjamin_frost",
      "caption": null,
      "imageUrl": null
    },
    "stickers": [],
    "location": {
      "latitude": 41.40338,
      "longitude": 2.17403
    },
    "likedBy": [],
    "comments": []
  }
]
```

</details>

### Like Post

<details>
  <summary>View details</summary>

```
POST /posts/:id/likes
```

</details>

### Unlike Post

<details>
  <summary>View details</summary>

```
DELETE /posts/:id/likes
```

</details>

### Comment on Post

<details>
  <summary>View details</summary>

```
POST /posts/:id/comments
```

Request Body

```
{
  text: string
}
```

</details>

### Create Post

<details>
  <summary>View details</summary>

```
POST /posts
```

Request Body

```
{
  caption: string,
  image: File,
  location: {
    latitude: number,
    longitude: number
  }
  stickers?: [
    {
      name: string,
      x: number,
      y: number,
      rotation: number
    }
  ]
}
```

</details>

### Get Available Stickers

<details>
  <summary>View details</summary>

```
GET /posts/stickers
```

Example Response

```json
[
  {
    "name": "a",
    "imageUrl": "/static/stickers/a.png"
  },
  {
    "name": "b",
    "imageUrl": "/static/stickers/b.png"
  }
]
```

</details>
