
$content = Get-Content "c:\dev\nyle-store\nyle-frontend\src\app\profile\page.js" -Raw
$target = 'const baseUrl = process.env.NEXT_PUBLIC_API_URL || '''';'
$replacement = 'const baseUrl = process.env.NEXT_PUBLIC_API_URL || '''';
                const authToken = getAuthToken();

                // Fetch Profile Info
                try {
                    const profileRes = await fetch(`${baseUrl}/api/users/profile`, {
                        headers: { ''Authorization'': `Bearer ${authToken}` }
                    });
                    if (profileRes.ok) {
                        const data = await profileRes.json();
                        setUserData({
                            phone: data.phone || data.phone_number || "",
                            language: data.language || "English (US)"
                        });
                        setEditForm({
                            name: session.user.name,
                            phone: data.phone || data.phone_number || ""
                        });
                    }
                } catch (e) {
                    console.warn("Profile info fetch failed");
                }'

$newContent = $content.Replace($target, $replacement)
$newContent | Set-Content "c:\dev\nyle-store\nyle-frontend\src\app\profile\page.js"
