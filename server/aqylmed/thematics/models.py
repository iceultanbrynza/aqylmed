from django.db import models

# Create your models here.

class Discipline(models.Model):
    pass

class Material(models.Model):
    class TypeEnum(models.TextChoices):
        BOOK = "Book"
        ARTICLE = "Article"
        VIDEO = "Video"

    material_type = models.CharField(max_length=20,
                                     choices=TypeEnum.choices,
                                     default=TypeEnum.BOOK)
    title = models.CharField(max_length=255)
    author_name = models.CharField(max_length=255)
    description = models.TextField()
    language = models.CharField(max_length=5)

class DisciplineTranslation(models.Model):
    discipline = models.ForeignKey(Discipline,
                                   on_delete=models.CASCADE,
                                   related_name="translation")
    name = models.CharField(max_length=100)
    language = models.CharField(max_length=5)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["discipline", "language"],
                name="unique_discipline_translation"
            )
        ]

class MaterialDiscipline(models.Model):
    material = models.ForeignKey(Material,
                                 on_delete=models.CASCADE,
                                 related_name="material_discipline_links")
    discipline = models.ForeignKey(Discipline,
                                   on_delete=models.CASCADE,
                                   related_name="discipline_material_links")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["material", "discipline"],
                name="unique_material_discipline"
            )
        ]

class Collection(models.Model):
    title = models.CharField(max_length=255)
    is_public = models.BooleanField(default=True)

class MaterialCollection(models.Model):
    material = models.ForeignKey(Material,
                                 on_delete=models.CASCADE,
                                 related_name="material_collection_links")
    collection = models.ForeignKey(Collection,
                                   on_delete=models.CASCADE,
                                   related_name="collection_material_links")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["material", "collection"],
                name="unique_material_collection"
            )
        ]

class Book(models.Model):
    chapters = models.JSONField()
    material = models.OneToOneField(Material,
                                 on_delete=models.CASCADE,
                                 related_name="book")

class Article(models.Model):
    link = models.URLField(max_length=500)
    material = models.OneToOneField(Material,
                                 on_delete=models.CASCADE,
                                 related_name="article")

class Media(models.Model):
    link = models.URLField(max_length=500)
    time_duration = models.DurationField()
    material = models.OneToOneField(Material,
                                 on_delete=models.CASCADE,
                                 related_name="media")