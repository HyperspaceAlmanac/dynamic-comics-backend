﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace capstone.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public int CommentorId { get; set; }
        [ForeignKey("CommentorId")]
        public Account Commentor { get; set; }
        [ForeignKey("Panel")]
        public int PanelId { get; set; }
        public int PanelNumber { get; set; }
        public DateTime Time { get; set; }
        public Panel Panel { get; set; }
    }
}
