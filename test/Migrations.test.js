const Migrations = artifacts.require("Migrations");

contract("Migrations", (accounts) => {
  let migrationsInstance;

  beforeEach(async () => {
    migrationsInstance = await Migrations.new();
  });

  it("should be deployed by the owner", async () => {
    const owner = await migrationsInstance.owner();
    assert.equal(owner, accounts[0], "Owner should be the account that deployed the contract");
  });

  it("should allow the owner to set a completed migration", async () => {
    await migrationsInstance.setCompleted(1, { from: accounts[0] });
    const lastCompletedMigration = await migrationsInstance.last_completed_migration();
    assert.equal(lastCompletedMigration.toNumber(), 1, "Last completed migration should be set to 1");
  });

  it("should not allow non-owner to set a completed migration", async () => {
    try {
      await migrationsInstance.setCompleted(1, { from: accounts[1] });
      assert.fail("Non-owner was able to set completed migration");
    } catch (error) {
      assert(error.message.includes("Ownable: caller is not the owner"), "Error should contain 'caller is not the owner'");
    }
  });

  it("should correctly track the last completed migration", async () => {
    await migrationsInstance.setCompleted(2, { from: accounts[0] });
    const lastCompletedMigration = await migrationsInstance.last_completed_migration();
    assert.equal(lastCompletedMigration.toNumber(), 2, "Last completed migration should be set to 2");
  });
});
