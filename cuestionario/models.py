from django.db import models
from authentication.models import Profile


# Create your models here.


class Cuestionario(models.Model):

	TYPE = (
			(0, 'kinestesico'),
			(1, 'visual'),
			(2, 'auditivo')
		)
	
	profile = models.OneToOneField(Profile, on_delete = models.CASCADE)
	results = models.PositiveSmallIntegerField(choices = TYPE)