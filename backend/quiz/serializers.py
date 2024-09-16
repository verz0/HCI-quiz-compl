from rest_framework import serializers
from .models import *


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class PromptedAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromptedAnswers
        fields = "__all__"


class UnpromptedAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnpromptedAnswers
        fields = "__all__"


class NoAssistanceAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoAssistanceAnswers
        fields = "__all__"


class FeedbackAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackANS
        fields = "__all__"
class FeedbackViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackForm
        fields = "__all__"