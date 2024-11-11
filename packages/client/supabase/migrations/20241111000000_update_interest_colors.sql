begin;

-- Update existing interests with new color format
update interests
set color = case slug
  when 'ai' then 'bg-purple'
  when 'secops' then 'bg-red'
  when 'sales' then 'bg-green'
  when 'it-ops' then 'bg-blue'
  when 'marketing' then 'bg-yellow'
  when 'engineering' then 'bg-orange'
  when 'devops' then 'bg-teal'
  when 'building-blocks' then 'bg-indigo'
  when 'design' then 'bg-pink'
  when 'finance' then 'bg-emerald'
  when 'hr' then 'bg-cyan'
  when 'product' then 'bg-violet'
  when 'support' then 'bg-rose'
  when 'other' then 'bg-slate'
end
where slug in (
  'ai', 'secops', 'sales', 'it-ops', 'marketing', 'engineering', 
  'devops', 'building-blocks', 'design', 'finance', 'hr', 
  'product', 'support', 'other'
);

commit; 