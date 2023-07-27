from fastapi.testclient import TestClient
from queries.drops import DropQueries
from main import app
import json

client = TestClient(app)


class EmptyDropQueries:
    def get_drops(self):
        return [
            {
                "id": 11,
                "name": "hii test",
                "photo": "string",
                "details": "string",
                "city": "string",
                "address": "string",
                "url": "string",
                "creator_id": {
                    "id": "1",
                    "email": "amanda@gmail.com",
                    "full_name": "amanda",
                    "username": "amanda",
                },
            },
            {
                "id": 12,
                "name": "hii test 2 ",
                "photo": "string",
                "details": "string",
                "city": "string",
                "address": "string",
                "url": "string",
                "creator_id": {
                    "id": "1",
                    "email": "amanda@gmail.com",
                    "full_name": "amanda",
                    "username": "amanda",
                },
            },
        ]


class FakeCreateDropQueries:
    def create_drop(self, drop):
        result = {
            "id": 11,
            "name": "hiii",
            "photo": "string",
            "details": "string",
            "city": "string",
            "address": "string",
            "url": "string",
            "creator_id": {
                "id": "1",
                "email": "string",
                "full_name": "string",
                "username": "string",
            },
        }

        # result.update(drop)
        return result


def test_get_all_drops():
    # Arrange

    app.dependency_overrides[DropQueries] = EmptyDropQueries
    # Act
    response = client.get("/api/drops")

    expected = [
        {
            "id": 11,
            "name": "hii test",
            "photo": "string",
            "details": "string",
            "city": "string",
            "address": "string",
            "url": "string",
            "creator_id": {
                "id": "1",
                "email": "amanda@gmail.com",
                "full_name": "amanda",
                "username": "amanda",
            },
        },
        {
            "id": 12,
            "name": "hii test 2 ",
            "photo": "string",
            "details": "string",
            "city": "string",
            "address": "string",
            "url": "string",
            "creator_id": {
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


def test_create_drop():
    app.dependency_overrides[DropQueries] = FakeCreateDropQueries

    drop = {
        "name": "hiii",
        "photo": "string",
        "details": "string",
        "city": "string",
        "address": "string",
        "url": "string",
        "creator_id": 1,
        "bucket_id": 1,
    }

    expected = {
        "id": 11,
        "name": "hiii",
        "photo": "string",
        "details": "string",
        "city": "string",
        "address": "string",
        "url": "string",
        "creator_id": {
            "id": "1",
            "email": "string",
            "full_name": "string",
            "username": "string",
        },
    }
    # Act
    response = client.post("/api/drops", json.dumps(drop))

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


# def test_delete_drop():
#     app.dependency_overrides[DropQueries] = DeleteDropQueries

#     response = client.delete("/api/drops/11"),

#     app.dependency_overrides = {}

#     # assert response.status_code == 200
#     assert response == 200
