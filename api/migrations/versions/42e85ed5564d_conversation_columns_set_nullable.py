"""conversation columns set nullable

Revision ID: 42e85ed5564d
Revises: f9107f83abab
Create Date: 2024-03-07 08:30:29.133614

"""
import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '42e85ed5564d'
down_revision = 'f9107f83abab'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('conversations', schema=None) as batch_op:
        batch_op.alter_column('app_model_config_id',
                              existing_type=postgresql.UUID(),
                              nullable=True)
        batch_op.alter_column('model_provider',
                              existing_type=sa.VARCHAR(length=255),
                              nullable=True)
        batch_op.alter_column('model_id',
                              existing_type=sa.VARCHAR(length=255),
                              nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('conversations', schema=None) as batch_op:
        batch_op.alter_column('model_id',
                              existing_type=sa.VARCHAR(length=255),
                              nullable=False)
        batch_op.alter_column('model_provider',
                              existing_type=sa.VARCHAR(length=255),
                              nullable=False)
        batch_op.alter_column('app_model_config_id',
                              existing_type=postgresql.UUID(),
                              nullable=False)

    # ### end Alembic commands ###
