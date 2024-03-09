from silence.decorators import endpoint


@endpoint(
    route="/mobiles",
    method="GET",
    sql="SELECT * FROM mobiles",
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/mobiles",
    method="POST",
    sql="INSERT INTO mobiles (model, system, photoURL, releaseDate) values ($model, $system, $photoURL, $releaseDate)",
)
def create(model, system, photoURL, releaseDate):
    pass

###############################################################################