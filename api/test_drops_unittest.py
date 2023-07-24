import unittest
from django import apps
import drops_test
from fastapi.testclient import TestClient
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
import authenticator


class DropIn(BaseModel):
    name: str
    photo: str
    details: str
    city: str
    address: str
    url: str
    creator_id: int
    bucket_id: int


class UserOut(BaseModel):
    username: str
    email: str
    roles: list[str]


def Accounts():
    return UserOut(
        username="Beowulf",
        email="beowulf@geats.com",
        roles=["hero"])


def test_create_drop():
    # Arrange
    client = TestClient(?)
    apps.dependency_overrides[authenticator.get_current_account_data] = fastapi

    # Prepare the input data for creating a drop
    drop_data = DropIn(
        name="Test Drop",
        photo="test_photo.jpg",
        details="Test details",
        city="Test City",
        address="Test Address",
        url="http://test.com",
        creator_id=1,
        bucket_id=1,
    )

    # Act
    response = client.post("/api/drops", json=drop_data.dict())

    # Clean up
    apps.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    created_drop = response.json()
    assert "id" in created_drop
    assert created_drop["name"] == drop_data.name
    assert created_drop["photo"] == drop_data.photo
    # Add more assertions as needed to validate the response.


if __name__ == '__main__':
    unittest.main()