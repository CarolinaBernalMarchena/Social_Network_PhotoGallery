from silence.decorators import endpoint

@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO Ratings \
         (userId, pictureId, ratingDate, ratingValue) \
         VALUES \
         ($userId, $pictureId, $ratingDate, $ratingValue)",
    auth_required = True
)
def add(userId, pictureId, ratingDate, ratingValue):
    pass

###############################################################################

@endpoint(
    route="/deleteRating/$userId/$pictureId",
    method="DELETE",
    sql="DELETE FROM ratings WHERE userId = $userId AND pictureId = $pictureId",
    auth_required = True
)
def delete():
    pass

###############################################################################



@endpoint(
    route="/deleteRating/$pictureId",
    method="DELETE",
    sql="DELETE FROM Ratings WHERE pictureId = $pictureId ",
    auth_required = True
)
def delete():
    pass


###############################################################################