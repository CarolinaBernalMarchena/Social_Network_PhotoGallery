from silence.decorators import endpoint

@endpoint(
    route="/pictures",
    method="GET",
    sql="SELECT pictureId, userId, url, profilePictureUrl, userName FROM users JOIN pictures USING (userId) WHERE visibility = 'PUBLIC' ORDER BY uploadDate DESC",
)
def get_allPictures():
    pass

###############################################################################

@endpoint(
    route="/pictures/$pictureId",
    method="GET",
    sql="SELECT pictureId, pictures.userId, url, uploadDate, title, description, AVG(ratingValue) AS rating, users.profilePictureUrl, users.userName FROM users JOIN pictures USING (userId) JOIN ratings USING (pictureId) WHERE pictureId = $pictureId ",

)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/comments/$pictureId",
    method="GET",
    sql="SELECT userId, commentId, pictureId, commentText, commentDate, userName, profilePictureUrl FROM comments JOIN users USING (userId) WHERE pictureId = $pictureId",
)
def get_comments_from_picture():
    pass

###############################################################################

@endpoint(
    route="/pictures",
    method="POST",
    sql="INSERT INTO Pictures \
         (userId, url, uploadDate, title, description, visibility) \
         VALUES \
         ($userId, $url, $uploadDate, $title, $description, $visibility)",
    auth_required= True
)
def add(userId, url, uploadDate, title, description, visibility):
    pass

###############################################################################

@endpoint(
    route="/pictures/$pictureId",
    method="PUT",
    sql="UPDATE Pictures SET userId = $userId, url = $url, \
         uploadDate = $uploadDate, title = $title, description = $description, visibility = $visibility  \
        WHERE pictureId = $pictureId",
    auth_required = True
)
def update(userId,url,uploadDate, title, description, visibility):
    pass

###############################################################################

@endpoint(
    route="/pictures/$pictureId",
    method="DELETE",
    sql=" DELETE FROM Pictures WHERE pictureId = $pictureId",
    auth_required = True
)
def delete():
    pass


###############################################################################

@endpoint(
    route="/picturesByFollowerUser/$userId",
    method="GET",
    sql="SELECT * FROM users JOIN pictures USING (userId) JOIN userfollowers ON users.userId = userfollowers.accountOwnerId WHERE userfollowers.followerId = $userId AND visibility = 'PUBLIC'",
    auth_required = True
)
def get_pictures_people_iFollow():
    pass


