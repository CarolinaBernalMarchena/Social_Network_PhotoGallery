from silence.decorators import endpoint


@endpoint(
    route="/users",
    method="GET",
    sql="SELECT * FROM users",
)
def get_users():
    pass

###############################################################################

@endpoint(
    route="/register",
    method="POST",
    sql="INSERT INTO Users \
         (name, surname, phoneNumber, email, userName, PASSWORD, profilePictureUrl) \
         VALUES \
         ($name, $surname, $phoneNumber, $email, $userName, $password, $profilePictureUrl)"
)
def add(name, surname, phoneNumber, email, userName, password, profilePictureUrl):
    pass

###############################################################################

@endpoint(
    route="/login/$password/$email",
    method="GET",
    sql="SELECT userId FROM users WHERE password = $password AND email = $email"
)
def login():
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT NAME, surname, email, userName, profilePictureUrl FROM users WHERE users.userId = $userId",
    auth_required = False
)
def get_user():
    pass

###############################################################################

@endpoint(
    route="/picturesUsers/$userId",
    method="GET",
    sql="SELECT url, title, pictureId FROM pictures JOIN users USING(userId) WHERE userId = $userId AND visibility = 'PUBLIC'",
    auth_required = False
)
def get_user_images():
    pass

###############################################################################

@endpoint(
    route="/userFollowers",
    method="POST",
    sql="INSERT INTO userFollowers \
         (followerId, accountOwnerId) \
         VALUES \
         ($followerId, $accountOwnerId)",
    auth_required = True
)
def add_follow(followerId, accountOwnerId):
    pass

###############################################################################

@endpoint(
    route="/userFollowers/$followerId/$accountOwnerId",
    method="DELETE",
    sql="DELETE FROM userFollowers WHERE followerId = $followerId AND accountOwnerId = $accountOwnerId",
    auth_required = True
)
def delete():
    pass

###############################################################################

@endpoint(
    route="/myPictures/$userId",
    method="GET",
    sql="SELECT url, title, pictureId FROM pictures JOIN users USING(userId) WHERE userId = $userId",
    auth_required = True
)
def get_my_images():
    pass

###############################################################################

@endpoint(
    route="/myfollowings/$userId",
    method="GET",
    sql="SELECT * FROM users JOIN userfollowers ON users.userId = userfollowers.accountOwnerId WHERE userfollowers.followerId = $userId",
    auth_required = True
)
def get_my_follows():
    pass