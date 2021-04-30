using System;
using System.Net;

using Microsoft.VisualStudio.TestPlatform.ObjectModel;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using FluentAssertions;

namespace LaufenTaler.Tests
{
    [TestClass]
    public class LaufenTalerTest
    {
        [TestMethod]
        public void HelloWorld()
        {
            //act
            var result = 1;

            //assert
            result.Should().Be(1);
        }
        //[TestMethod]
        //public void ConnectToApp()
        //{
        //    // arrange
        //    var app = new LaufenTaler.App();

        //    // act
        //    var result = app.GetAsync("WeatherForecast").GetAwaiter().GetResult();

        //    // assert
        //    // We are only interested in establishing a connection. Getting a "200 OK" is enough for this test
        //    result.EnsureSuccessStatusCode();
        //    result.StatusCode.Should().Be(HttpStatusCode.OK);

        //    // clean up
        //    client.Dispose();
        //    factory.Dispose();
        //}
    }
}
