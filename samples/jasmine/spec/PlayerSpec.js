describe("Player", function() {
  var player;

  beforeEach(function() {
    player = new Player();

    mok({
      url: '/api/player/1',
      verb: 'GET',
      returnValue: {
        id: 1,
        name: 'Player 1'
      }
    });

    mok({
      url: '/api/player/1',
      verb: 'POST',
      returnValue: {
        success: true
      }
    });

    mok({
      url: '/api/player/1',
      verb: 'DELETE',
      returnValue: {
        success: true
      }
    });

    mok({
      url: '/api/player/',
      verb: 'PUT',
      returnValue: {
        success: true,
        id: 3
      }
    });
  });

  afterEach(function() {
    destroyMoks();
  });

  it("should load player from Mok", function() {
    player.load(1);

    waitsFor(function() {
      return player.loaded;
    }, "Player never finished loading", 5000);

    runs(function () {
      expect(player.id).toEqual(1);
      expect(player.name).toEqual('Player 1');
    });    
  });

  it("should update player", function() {
    player.id = 1;
    player.name = 'Player 1';
    player.update();

    waitsFor(function() {
      return !player.updating;
    }, "Player never finished updating", 1000);

    runs(function() {
      expect(player.name).toEqual('Player 1'); //player is never actually updated
    });
  });

  it("should delete player", function() {
    player.id = 1;
    player.name = 'Player 1';
    player.delete();

    waitsFor(function() {
      return !player.deleting;
    }, "Player never finished deleting", 1000);

    runs(function() {
      expect(player.name).toEqual('Player 1'); //player is never actually deleted
    });
  });

  it("should add player", function() {
    player.name = 'Player 1';
    player.add();

    waitsFor(function() {
      return !player.adding;
    }, "Player never finished adding", 1000);

    runs(function() {
      expect(player.id).toEqual(3); //player is never actually deleted
    });
  });
});