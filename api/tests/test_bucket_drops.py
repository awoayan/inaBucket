from fastapi import FastAPI
from fastapi.testclient import TestClient
from queries.bucket_drops import BucketDropQueries
from main import app
import json

client = TestClient(app)


class FakeEmptyBucketDropQueries:
    def get_drops_in_bucket(self, bucket_id):
        return [
            {
                "bucket_id": 1,
                "bucket_title": "string",
                "drop_id": 0,
                "drop_name": "string",
                "drop_photo": "string",
                "drop_details": "string",
                "drop_city": "string",
                "drop_address": "string",
                "drop_url": "string",
                "creator_id": 0,
                "username": "string"
            },
        ]


class FakeCreateBucketQueries:
    def save_drop(self, bucket_drop):
        result = {
            "bucket_id": 1,
            "drop_id": 0
        }       

        return result


def test_get_all_bucketdrops():
    app.dependency_overrides[BucketDropQueries] = FakeEmptyBucketDropQueries

    response = client.get("/api/bucket_drops/1")

    expected = [
        {
            "bucket_id": 1,
            "bucket_title": "string",
            "drop_id": 0,
            "drop_name": "string",
            "drop_photo": "string",
            "drop_details": "string",
            "drop_city": "string",
            "drop_address": "string",
            "drop_url": "string",
            "creator_id": 0,
            "username": "string"
        },
    ]
    # Clean up
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_create_drop():
    app.dependency_overrides[BucketDropQueries] = FakeCreateBucketQueries

    bucketdrop = {
        "bucket_id": 1,
        "bucket_title": "string",
        "drop_id": 0,
        "drop_name": "string",
        "drop_photo": "string",
        "drop_details": "string",
        "drop_city": "string",
        "drop_address": "string",
        "drop_url": "string",
        "creator_id": 0,
        "username": "string"
    }

    expected = {
        "bucket_id": 1,
        "drop_id": 0
    }
    # Act
    response = client.post("/api/bucket_drops", json=bucketdrop)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
