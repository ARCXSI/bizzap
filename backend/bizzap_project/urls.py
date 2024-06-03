from django.contrib import admin
from django.urls import path, include
from knox import views as knox_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('bizzap_app.urls')),
    # path('api/auth/', include('knox.urls')),

    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'), # exclui 1 registro de token do usuário (o token que estiver sendo utilizado no momento)
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'), # exclui todos os registros de token do usuário (o atual e os antigos)

    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace = 'password_reset')),

#   The views would then accessible as:
#   /api/auth/login -> LoginView
#   /api/auth/logout -> LogoutView
#   /api/auth/logoutall -> LogoutAllView
]