# Remove the old version from git tracking
git rm --cached config.py

# Add the fixed version
git add config.py

# Commit
git commit -m "Fix config.py to use environment variables"

# Push
git push origin main