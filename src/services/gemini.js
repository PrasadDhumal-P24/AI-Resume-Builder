const API_KEY = import.meta.env.VITE_AI_API_KEY

async function askAI(prompt) {
  if (!API_KEY) throw new Error('API key not found!')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  if (data.error) throw new Error(data.error.message)
  return data.content[0].text
}

export async function enhanceSummary(summary, name) {
  return await askAI(
    `You are a professional resume writer. Rewrite this summary for ${name} to be powerful and ATS-friendly in 3-4 sentences. Return ONLY the rewritten text, nothing else.

"${summary}"`
  )
}

export async function enhanceExperience(experiences) {
  if (!experiences?.length) return experiences
  const valid = experiences.filter(e => e.company && e.description)
  if (!valid.length) return experiences

  const result = await askAI(
    `Rewrite these job descriptions as professional bullet points with strong action verbs. Give 3 bullets per job starting with "• ". Separate different jobs with "---". Return ONLY bullet points, nothing else.

${valid.map((e, i) => `${i+1}. ${e.role} at ${e.company}: ${e.description}`).join('\n\n')}`
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
    `Rewrite these project descriptions as impressive technical bullet points. Give 3 bullets per project starting with "• ". Separate different projects with "---". Return ONLY bullet points, nothing else.

${valid.map((p, i) => `${i+1}. ${p.name} (${p.techStack}): ${p.description}`).join('\n\n')}`
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
    `Clean and format these skills for a professional resume. Remove duplicates, fix capitalization.

Technical: ${skills.technical}
Tools: ${skills.tools || 'None'}
Soft Skills: ${skills.soft || 'None'}

Return ONLY this JSON, no backticks, no extra text:
{"technical":"cleaned skills","tools":"cleaned tools","soft":"cleaned soft skills"}`
  )

  try {
    const clean = result.replace(/```json|```/g, '').trim()
    return { ...skills, ...JSON.parse(clean) }
  } catch {
    return skills
  }
}