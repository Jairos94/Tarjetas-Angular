using BKTarjetaCredito.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BKTarjetaCredito
{
    public class AplicationDbContex:DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public AplicationDbContex(DbContextOptions<AplicationDbContex> options): base(options)
        { 

        }
    }
}
