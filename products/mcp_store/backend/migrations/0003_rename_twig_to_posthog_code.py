from django.db import migrations, models


def rename_twig_to_posthog_code(apps, schema_editor):
    MCPOAuthState = apps.get_model("mcp_store", "MCPOAuthState")
    MCPOAuthState.objects.filter(install_source="twig").update(install_source="posthog-code")


class Migration(migrations.Migration):
    dependencies = [
        ("mcp_store", "0002_mcpserverinstallation_is_enabled_mcpoauthstate"),
    ]

    operations = [
        migrations.RunPython(rename_twig_to_posthog_code, migrations.RunPython.noop, elidable=True),
        migrations.RenameField(
            model_name="mcpoauthstate",
            old_name="twig_callback_url",
            new_name="posthog_code_callback_url",
        ),
        migrations.AlterField(
            model_name="mcpoauthstate",
            name="install_source",
            field=models.CharField(
                choices=[("posthog", "posthog"), ("posthog-code", "posthog-code")],
                default="posthog",
                max_length=20,
            ),
        ),
    ]
