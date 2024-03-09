from silence.decorators import endpoint
###############################################################################

@endpoint(
    route="/picturecategories",
    method="POST",
    sql="INSERT INTO PictureCategories \
         (pictureId, categoryId) \
         VALUES \
         ($pictureId, $categoryId)",
    auth_required = True
)
def add_picture_category(pictureId, categoryId):
    pass

###############################################################################

@endpoint(
    route="/picturecategories/$pictureId",
    method="DELETE",
    sql="DELETE FROM picturecategories WHERE pictureId = $pictureId",
    auth_required = True
)
def delete():
    pass

###############################################################################

@endpoint(
    route="/categories",
    method="POST",
    sql="INSERT INTO Categories \
         (categoryName) \
         VALUES \
         ($categoryName)",
    auth_required = True
)
def add(categoryName):
    pass

###############################################################################

@endpoint(
    route="/categories/$categoryName/categoryAll",
    method="GET",
    sql="SELECT categoryName, url, title, pictureId ,pictures.userId FROM categories JOIN picturecategories USING(categoryId) JOIN pictures USING(pictureId) WHERE categoryName = $categoryName",
    auth_required = True
)
def get_pictures_from_category():
    pass

###############################################################################

@endpoint(
    route="/categories/categoryAll",
    method="GET",
    sql="SELECT * FROM categories",
    auth_required = True
)
def get_all_categories():
    pass

###############################################################################

@endpoint(
    route="/getCategories/$pictureId",
    method="GET",
    sql="SELECT categoryId FROM picturecategories WHERE pictureId = $pictureId",
    auth_required = True
)
def get_categoriesforFoto():
    pass

###############################################################################

@endpoint(
    route="/getPhotoCategories/$pictureId",
    method="GET",
    sql="SELECT categoryName, categoryId FROM picturecategories JOIN categories USING(categoryId) WHERE pictureId = $pictureId",
    auth_required = True
)
def get_categories2():
    pass