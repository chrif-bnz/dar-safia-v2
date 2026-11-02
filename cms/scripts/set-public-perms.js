const { boot } = require('./_boot');

async function main() {
  const app = await boot();
  
  const publicRole = await app.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
    populate: ['permissions'],
  });

  if (publicRole) {
    const action = 'api::order.order.create';
    
    // Check if permission already exists
    const hasPerm = publicRole.permissions.find(p => p.action === action);
    
    if (!hasPerm) {
      await app.query('plugin::users-permissions.permission').create({
        data: {
          action: action,
          role: publicRole.id,
        }
      });
      console.log(`Permission ${action} added to public role.`);
    } else {
      console.log(`Permission ${action} already exists for public role.`);
    }
  }

  await app.destroy();
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  }
);
