describe("Player", function() {
  var player;
  var mokServer;

  beforeEach(function() {
    player = new Player();
    mokServer = new ApiMok();

    mokServer.mok({
      url: '/api/player/1',
      verb: 'GET',
      returnValue: {
        id: 1,
        name: 'Player 1'
      }
    });

    mokServer.mok({
      url: '/api/player/1',
      verb: 'POST',
      returnValue: {
        success: true
      }
    });

    mokServer.mok({
      url: '/api/player/1',
      verb: 'DELETE',
      returnValue: {
        success: true
      }
    });

    mokServer.mok({
      url: '/api/player/',
      verb: 'PUT',
      returnValue: {
        success: true,
        id: 3
      }
    });
  });

  afterEach(function() {
    mokServer.destroyAll();
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
      expect(player.id).toEqual(3); //player is never actually added
    });
  });
});