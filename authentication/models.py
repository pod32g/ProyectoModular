from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models

# Create your models here.

class Profile(models.Model):
	TYPE = (
			(0, 'Super User'),
			(1, 'Maestro'),
			(2, 'Estudiante')
		)

	user = models.OneToOneField(User, on_delete = models.CASCADE)
	email = models.EmailField(max_length = 256, unique = True)
	profile_type = models.PositiveSmallIntegerField(choices = TYPE)
	code = models.CharField(max_length = 9) 

@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, profile_type = 2)
    instance.profile.save()