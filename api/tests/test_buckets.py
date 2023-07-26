from fastapi import FastAPI
from fastapi.testclient import TestClient
from queries.pool import BucketQueries
from main import app
import json


client = TestClient(app)


class FakeEmptyBucketQueries:
    def get_buckets(self):
        return [
            {
                "id": 1,
                "title": "hehe",
                "cover_photo": "heheh",
                "details": "heh",
                "owner": {
                    "id": "1",
                    "email": "amanda@gmail.com",
                    "full_name": "amanda",
                    "username": "amanda",
                },
            },
            {
                "id": 2,
                "title": "hehe",
                "cover_photo": "heheh",
                "details": "heh",
                "owner": {
                    "id": "1",
                    "email": "amanda@gmail.com",
                    "full_name": "amanda",
                    "username": "amanda",
                },
            },
        ]


class FakeCreateBucketQueries:
    def create_bucket(self, bucket):
        result = {
            "id": 0,
            "title": "string",
            "cover_photo": "string",
            "details": "string",
            "owner": {
                "id": "string",
                "email": "string",
                "full_name": "string",
                "username": "string",
            },
        }

        return result


def test_get_all_buckets():
    # Arrange
    app.dependency_overrides[BucketQueries] = FakeEmptyBucketQueries
    # Act
    response = client.get("/api/buckets")

    expected = [
        {
            "id": 1,
            "title": "hehe",
            "cover_photo": "heheh",
            "details": "heh",
            "owner": {
                "id": "1",
                "email": "amanda@gmail.com",
                "full_name": "amanda",
                "username": "amanda",
            },
        },
        {
            "id": 2,
            "title": "hehe",
            "cover_photo": "heheh",
            "details": "heh",
            "owner": {
                "id": "1",
                "email": "amanda@gmail.com",
                "full_name": "amanda",
                "username": "amanda",
            },
        },
    ]

    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_create_bucket():
    app.dependency_overrides[BucketQueries] = FakeCreateBucketQueries

    bucket = {
        "title": "string",
        "cover_photo": "string",
        "details": "string",
        "account_id": 0,
    }

    expected = {
        "id": 0,
        "title": "string",
        "cover_photo": "string",
        "details": "string",
        "owner": {
            "id": "string",
            "email": "string",
            "full_name": "string",
            "username": "string",
        },
    }

    response = client.post("/api/buckets", json.dumps(bucket))

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
