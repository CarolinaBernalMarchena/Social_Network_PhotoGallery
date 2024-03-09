from silence.decorators import endpoint

@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments \
         (userId, pictureId, commentText, commentDate) \
         VALUES \
         ($userId, $pictureId, $commentText, $commentDate)",
    auth_required = True
)
def add(userId, pictureId, commentText, commentDate):
    pass