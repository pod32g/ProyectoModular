from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseAdmin
from django.contrib.auth.models import User


from .models import Profile

# Register your models here.


class ProfileInline(admin.TabularInline):
	model = Profile
	can_delete = False
	verbose_name_plural = 'Profiles'

class UserAdmin(BaseAdmin):
	inlines = [ProfileInline]

class ProfileAdmin(admin.ModelAdmin):
	list_display = ('email', 'user', 'profile_type', 'code')

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)