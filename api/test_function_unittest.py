from pydantic import BaseModel

class UserOut(BaseModel):
    username: str
    email: str
    roles: list[str]

def fake_get_current_account_data():
    return UserOut(username="Beowulf",
                email="beowulf@geats.com",
                roles=["hero"])

def test_get_thing():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] =
    fake_get_current_account_data

    # Act
    response = client.get("/api/thing")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == ThingOut(thing=2)




















