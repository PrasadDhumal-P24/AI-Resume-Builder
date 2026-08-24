const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// Test 
console.log('API Key loaded:', API_KEY ? '✅ Found' : '❌ Missing')

async function askAI(prompt) {
  if (!API_KEY) {
    throw new Error('API_KEY_MISSING')
  }

  // AQ. key correct endpoint
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    }
  )

  const data = await response.json()

  if (data.error) {
    console.error('API Error:', data.error)
    throw new Error(data.error.message)
  }

  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('No response from AI')
  }

  return data.candidates[0].content.parts[0].text
}

export async function enhanceSummary(summary, name) {
  return await askAI(
    `You are a professional resume writer. Rewrite this professional summary for ${name} to make it powerful, ATS-friendly, and impressive in exactly 3-4 sentences. Return ONLY the rewritten text, nothing else, no quotes.

Summary: ${summary}`
  )
}

export async function enhanceExperience(experiences) {
  if (!experiences?.length) return experiences
  const valid = experiences.filter(e => e.company && e.description)
  if (!valid.length) return experiences

  const result = await askAI(
    `You are a professional resume writer. Rewrite these work experience descriptions as powerful bullet points with strong action verbs. Give exactly 3 bullet points per job starting with "•". Separate different jobs with "---". Return ONLY the bullet points, nothing else.

${valid.map((e, i) =>
      `Job ${i + 1}: ${e.role} at ${e.company}\nDescription: ${e.description}`
    ).join('\n\n')}`
  )

  const sections = result.split('---')
  return experiences.map((exp, i) => ({
    ...exp,
    description: sections[i]?.trim() || exp.description
  }))
}

export async function enhanceProjects(projects) {
  if (!projects?.length) return projects
  const valid = projects.filter(p => p.name && p.description)
  if (!valid.length) return projects

  const result = await askAI(
    `You are a professional resume writer. Rewrite these project descriptions as impressive technical bullet points. Give exactly 3 bullet points per project starting with "•". Separate different projects with "---". Return ONLY the bullet points, nothing else.

${valid.map((p, i) =>
      `Project ${i + 1}: ${p.name}\nTech: ${p.techStack}\nDescription: ${p.description}`
    ).join('\n\n')}`
  )

  const sections = result.split('---')
  return projects.map((proj, i) => ({
    ...proj,
    highlights: sections[i]?.trim() || proj.highlights
  }))
}

export async function enhanceSkills(skills) {
  if (!skills.technical) return skills

  const result = await askAI(
    `Clean and professionally format these resume skills. Remove duplicates, fix capitalization, organize properly.

Technical Skills: ${skills.technical}
Tools: ${skills.tools || 'None'}
Soft Skills: ${skills.soft || 'None'}

Return ONLY this exact JSON format, no backticks, no extra text:
{"technical":"cleaned technical skills","tools":"cleaned tools","soft":"cleaned soft skills"}`
  )

  try {
    const clean = result.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    return { ...skills, ...parsed }
  } catch {
    return skills
  }
}