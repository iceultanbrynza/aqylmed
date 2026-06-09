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
    discipline = models.ForeignKey(Discipline,
                                   on_delete=models.CASCADE,
                                   related_name="materials")

class DisciplineTranslation(models.Model):
    discipline = models.ForeignKey(Discipline,
                                   on_delete=models.CASCADE,
                                   related_name="translation")
    name = models.CharField(max_length=100)
    language = models.CharField(max_length=5)

class MaterialDiscipline(models.Model):
    material = models.ForeignKey(Material,
                                 on_delete=models.CASCADE,
                                 related_name="material_discipline_link")
    discipline = models.ForeignKey(Discipline,
                                   on_delete=models.CASCADE,
                                   related_name="discipline_material_link")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["material", "discipline"],
                name="unique_material_discipline"
            )
        ]
