"""adds models

Revision ID: 883f31eb6d7a
Revises: 46cd27133ed8
Create Date: 2023-10-26 18:58:24.897806

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '883f31eb6d7a'
down_revision = '46cd27133ed8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('conditions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('medications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name_brand', sa.String(), nullable=True),
    sa.Column('name_generic', sa.String(), nullable=True),
    sa.Column('drug_class', sa.String(), nullable=True),
    sa.Column('prescribed_for', sa.String(), nullable=True),
    sa.Column('side_effects', sa.String(), nullable=True),
    sa.Column('pill_image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('birthday', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('faves',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('faved_on', sa.Date(), nullable=True),
    sa.Column('unfaved_on', sa.Date(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('medication_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['medication_id'], ['medications.id'], name=op.f('fk_faves_medication_id_medications')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_faves_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('treatments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('condition_id', sa.Integer(), nullable=True),
    sa.Column('medication_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['condition_id'], ['conditions.id'], name=op.f('fk_treatments_condition_id_conditions')),
    sa.ForeignKeyConstraint(['medication_id'], ['medications.id'], name=op.f('fk_treatments_medication_id_medications')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('treatments')
    op.drop_table('faves')
    op.drop_table('users')
    op.drop_table('medications')
    op.drop_table('conditions')
    # ### end Alembic commands ###