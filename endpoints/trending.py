from silence.decorators import endpoint

@endpoint(
    route="/trendingPictures/ratings",
    method="GET",
    sql="SELECT pictureId, pictures.userId, url, uploadDate, title, AVG(ratingValue) AS newValue FROM pictures  JOIN ratings USING (pictureId)  WHERE uploadDate > NOW() - INTERVAL 7 DAY AND visibility = 'public' GROUP BY pictures.pictureId ORDER BY newValue DESC LIMIT 5",
)
def get_pictures_maxRating():
    pass

###############################################################################

@endpoint(
    route="/trendingPictures/comments",
    method="GET",
    sql="SELECT pictureId, pictures.userId, url, uploadDate, title,COUNT(commentText) AS counter FROM pictures JOIN comments USING (pictureId) WHERE uploadDate > NOW() - INTERVAL 7 DAY AND visibility = 'PUBLIC' GROUP BY pictures.pictureId ORDER BY COUNT(commentText) DESC LIMIT 5",
)
def get_pictures_maxComments():
    pass

###############################################################################

@endpoint(
    route="/trendingPictures/categories",
    method="GET",
    sql="SELECT pictureId, categoryId, categoryName, COUNT(pictureId) AS categorieCount FROM categories JOIN picturecategories USING(categoryId) JOIN pictures USING(pictureId) WHERE visibility = 'PUBLIC' GROUP BY(categoryName) ORDER BY COUNT(pictureId) DESC LIMIT 5",
)
def get_categories_maxPictures():
    pass

###############################################################################

@endpoint(
    route="/trendingPictures/userfollowers",
    method="GET",
    sql="SELECT users.userId, userName, profilePictureUrl, COUNT(*) AS followers FROM  userfollowers JOIN users ON userfollowers.accountOwnerId = users.userId GROUP BY accountOwnerId ORDER BY followers DESC LIMIT 5",
)
def get_users_maxFollowers():
    pass

###############################################################################

@endpoint(
    route="/trendingPictures/users",
    method="GET",
    sql="SELECT users.userId, userName, profilePictureUrl, AVG(ratingValue) AS newRating  FROM users JOIN pictures USING(userId) JOIN ratings USING(pictureId) GROUP BY (users.name) ORDER BY newRating DESC LIMIT 5",
)
def get_users_maxPhotoRatings():
    pass
