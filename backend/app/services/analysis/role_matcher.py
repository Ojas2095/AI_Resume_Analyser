def match_role(extracted_skills: dict,role_data: dict)->dict:
    resume_skills=set(extracted_skills.keys())

    required=set(role_data["required_skills"])
    nice=set(role_data.get("nice_to_have",[]))

    matched_required=sorted(required & resume_skills)
    missing_required=sorted(required - resume_skills)

    matched_nice=sorted(nice & resume_skills)
    missing_nice=sorted(nice - resume_skills)

    val: float = len(matched_required) / max(1, len(required)) * 100
    coverage = round(float(val), 2) if required else 0.0
    return{
        "role": role_data["role"],
        "coverage": coverage,
        "required":{
            "matched": matched_required,
            "missing": missing_required
        },
        "nice_to_have":{
            "matched": matched_nice,
            "missing": missing_nice
        }
    }