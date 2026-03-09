from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("posthog", "1040_rename_twig_to_posthog_code"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="oauthapplication",
            name="auth_brand",
        ),
    ]
