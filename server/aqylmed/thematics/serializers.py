from rest_framework import serializers
from thematics.models import Thematic, Quiz

class QuizSerializer(serializers.Serializer):
    title = serializers.CharField()
    questions_count = serializers.IntegerField()
    questions = serializers.JSONField()
    difficulty = serializers.CharField()
    thematics = serializers.PrimaryKeyRelatedField(
        queryset=Thematic.objects.all()
    )

    def validate(self, data):
        thematic = data["thematics"]

        if thematic.quiz_count >= 10:
            raise serializers.ValidationError(
                "Max quizzes reached"
            )

        return data