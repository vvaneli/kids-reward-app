from rest_framework.views import APIView
# from django.contrib.auth.hashers import make_password

# from lib.views import ObjectOwnerView

class ObjectOwnerView(APIView):
    def perform_create(self, serializer):
        serializer.save(ref_owner=self.request.user)

# class HashUpdatedPassword(APIView):
#     print('at HashUpdatedPassword')
#     def perform_update(self, serializer):
#       password = serializer.validated_data.get('password')
#       if password:
#         serializer.validated_data['password'] = make_password(password)
#       serializer.save()