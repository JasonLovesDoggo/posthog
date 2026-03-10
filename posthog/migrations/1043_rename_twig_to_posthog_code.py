from django.db import migrations, models


def rename_twig_to_posthog_code(apps, schema_editor):
    Integration = apps.get_model("posthog", "Integration")
    Integration.objects.filter(kind="slack-twig").update(kind="slack-posthog-code")


class Migration(migrations.Migration):
    dependencies = [
        ("posthog", "1042_subscription_integration_idx"),
    ]

    operations = [
        migrations.RunPython(rename_twig_to_posthog_code, migrations.RunPython.noop, elidable=True),
        migrations.AlterField(
            model_name="integration",
            name="kind",
            field=models.CharField(
                choices=[
                    ("slack", "Slack"),
                    ("slack-posthog-code", "Slack Posthog Code"),
                    ("salesforce", "Salesforce"),
                    ("hubspot", "Hubspot"),
                    ("google-pubsub", "Google Pubsub"),
                    ("google-cloud-storage", "Google Cloud Storage"),
                    ("google-ads", "Google Ads"),
                    ("google-sheets", "Google Sheets"),
                    ("snapchat", "Snapchat"),
                    ("linkedin-ads", "Linkedin Ads"),
                    ("reddit-ads", "Reddit Ads"),
                    ("tiktok-ads", "Tiktok Ads"),
                    ("bing-ads", "Bing Ads"),
                    ("intercom", "Intercom"),
                    ("email", "Email"),
                    ("linear", "Linear"),
                    ("github", "Github"),
                    ("gitlab", "Gitlab"),
                    ("meta-ads", "Meta Ads"),
                    ("twilio", "Twilio"),
                    ("clickup", "Clickup"),
                    ("vercel", "Vercel"),
                    ("databricks", "Databricks"),
                    ("azure-blob", "Azure Blob"),
                    ("firebase", "Firebase"),
                    ("jira", "Jira"),
                    ("pinterest-ads", "Pinterest Ads"),
                ],
                max_length=20,
            ),
        ),
    ]
