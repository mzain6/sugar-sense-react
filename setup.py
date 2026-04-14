"""
Setup configuration for Sugar Sense package.
"""

from setuptools import setup, find_packages

with open('README.md', 'r', encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='sugar-sense',
    version='1.0.0',
    description='Diabetes prediction application using Flask and React',
    long_description=long_description,
    long_description_content_type='text/markdown',
    author='Your Name',
    author_email='your.email@example.com',
    url='https://github.com/yourusername/sugar-sense',
    packages=find_packages(),
    python_requires='>=3.8',
    install_requires=[
        'Flask==3.0.0',
        'Flask-CORS==4.0.0',
        'Flask-Dotenv==0.0.3',
        'python-dotenv==1.0.0',
        'scikit-learn==1.4.2',
        'pandas==2.2.0',
        'numpy==1.24.3',
        'joblib==1.3.2',
    ],
    extras_require={
        'dev': [
            'gunicorn==21.2.0',
            'pytest==7.4.3',
            'pytest-cov==4.1.0',
            'black==23.12.1',
            'flake8==6.1.0',
        ],
    },
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Healthcare Industry',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Programming Language :: Python :: 3.11',
    ],
)
