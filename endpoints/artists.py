from silence.decorators import endpoint


@endpoint(
    route="/artists",
    method="GET",
    sql="SELECT * FROM artists",
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/artists",
    method="POST",
    sql="INSERT INTO artists (name, genre, debutDate, photoURL, shortBio) values ($name, $genre, $debutDate, $photoURL, $shortBio)",
)
def create(name, genre, debutDate, photoURL, shortBio):
    pass

###############################################################################